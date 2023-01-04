import type { GroupEventHandler } from "./types";
import { selfNoAuthMsg, roleAuth, validateUid, handleAt } from "../utils";

export const adminHandler: GroupEventHandler = async (e, group, plugin, bot, config, params) => {
	// 消息发送人的uid
	const sender_id = e.sender.user_id;
	const { permissionList, enableAt } = config.adminConfig;
	// 发送者若不在权限组中且不是bot管理员则返回
	if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
	// bot若不是群主则发送
	if (!roleAuth.selfIsGroupOwner(group)) return e.reply(selfNoAuthMsg);
	else {
		// uid
		let uid: number | string | undefined = undefined;
		// 判断是否开始at功能
		if (enableAt) {
			// 判断指令中第三个参数是否是合法uid
			uid = e.raw_message.split(" ")[2];
			// 若不合法则取用at解析出来的uid
			if (!validateUid(uid)) {
				uid = handleAt(e);
			}
		}
		// 若uid存在且合法
		if (validateUid(uid!)) {
			uid = Number(uid);
			try {
				// 获取该成员,若不存在则报错
				const member = group.pickMember(uid, true);
				const nickname = member.info!.nickname;
				// 若是添加管理员
				if (params) {
					// 若该成员已是群管理员
					if (roleAuth.isGroupAdmin(group, uid)) {
						return e.reply(`${uid}(${nickname}) 已是本群管理员,请勿重复设置`);
					} else {
						const flag = await group.setAdmin(Number(uid), true);
						if (flag) {
							return e.reply(`已将 ${uid}(${nickname}) 设置为管理员`);
						} else return e.reply(`未能将 ${uid} 设置为管理员`);
					}
				} else {
					// 移除管理
					// 若该成员非群管理
					if (!roleAuth.isGroupAdmin(group, uid)) {
						return e.reply(`${uid}(${nickname}) 尚未被设置为本群管理员,无需取消`);
					} else {
						const flag = await group.setAdmin(Number(uid), false);
						if (flag) return e.reply(`已取消 ${uid}(${nickname}) 的管理员身份`);
						else return e.reply(`未能取消 ${uid} 的管理员身份`);
					}
				}
			} catch (err) {
				return e.reply(`本群不存在成员 ${uid}`);
			}
		} else {
			return e.reply("请输入正确的uid哦~");
		}
	}
};
