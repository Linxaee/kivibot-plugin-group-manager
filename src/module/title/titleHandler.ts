import type { GroupEventHandler } from "../types";
import type { ModuleConfig } from "../../config";
import { selfNoAuthMsg, roleAuth, validateUid, handleAt, validateTitle } from "../../utils";
export const titleHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象
    const group = e.group;
    const { permissionList, enableAt } = config.titleConfig as ModuleConfig;

    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    // bot若不是管理或群主则发送
    if (!roleAuth.selfIsGroupOwner(group)) return e.reply(selfNoAuthMsg + "设置头衔需将bot设置为群主");
    else {
        // uid
        let uid: number | string | undefined = undefined;
        // 头衔
        let title: string | undefined = undefined;
        [uid, title] = argMsg.split(" ");
        // 判断是否开始at功能
        if (enableAt) {
            // 判断指令中第三个参数是否是合法uid
            // 若不合法则采用at解析出来的uid
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
                // 若待设置头衔不存在或者为空则清空头衔
                if (!title) {
                    const flag = await group.setTitle(uid);
                    if (flag) return e.reply(`已清空 ${uid}(${nickname}) 的头衔`);
                    else return e.reply(`未能清空 ${uid} 的头衔`);
                }
                // 获取待设置头衔的字符长度
                if (!validateTitle(title)) return e.reply(`头衔大于12个字符,请重新设置`);
                // 校验通过,设置头衔
                const flag = await group.setTitle(uid, title);
                if (flag) return e.reply(`已将 ${uid}(${nickname}) 的头衔设置为 ${title}`);
                else return e.reply(`未能设置 ${uid} 的头衔,请检查头衔长度`);
            } catch (err) {
                return e.reply(`本群不存在成员 ${uid}`);
            }
        } else {
            return e.reply("请输入正确的uid哦~");
        }
    }
};
