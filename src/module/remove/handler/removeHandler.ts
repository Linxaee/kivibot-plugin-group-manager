import type { GroupEventHandler } from "../../types";
import { selfNoAuthMsg, roleAuth, validateUid, handleAt, ifSelf, getGroupConfig } from "../../../utils";

export const removeHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象和发送者群员对象
    const group = e.group;
    const groupConfig = getGroupConfig(e, config);
    const { permissionList, enableAt } = groupConfig!.removeConfig;

    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    // bot若不是群主或管理员则发送
    if (!roleAuth.selfIsGroupAdmin(group) && !roleAuth.selfIsGroupOwner(group))
        return e.reply(selfNoAuthMsg + "踢出成员需将bot设置为管理员或群主哦");
    else {
        // uid
        let uid: number | string | undefined = undefined;
        uid = argMsg;
        // 判断是否开始at功能
        if (enableAt) {
            // 判断指令中第三个参数是否是合法uid
            // 若不合法则取用at解析出来的uid
            if (!validateUid(uid)) {
                uid = handleAt(e);
            }
        }
        // 若uid存在且合法
        if (validateUid(uid!)) {
            uid = Number(uid);
            // 判断是否是对bot本身操作
            if (ifSelf(uid, plugin.bot!)) return e.reply(`无法对bot自身进行踢出操作哦`);
            try {
                // 获取该成员,若不存在则报错
                const member = group.pickMember(uid);
                const nickname = member.info?.nickname;
                // 若踢出的是管理，但bot不是群主
                if (roleAuth.isGroupAdmin(group, uid) && !roleAuth.selfIsGroupOwner(group))
                    return e.reply(selfNoAuthMsg);
                // 若是单纯踢出
                if (params) {
                    const flag = await group.kickMember(Number(uid));
                    if (flag) {
                        return e.reply(`已将 ${uid}(${nickname})移出本群`);
                    } else return e.reply(`未能将 ${uid}(${nickname}) 移出本群`);
                } else {
                    // 若是踢出并加入黑名单
                    const flag = await group.kickMember(Number(uid), true);
                    groupConfig.accessConfig.setting.blackList.push(Number(uid));
                    plugin.saveConfig(config);
                    if (flag) return e.reply(`已将 ${uid}(${nickname})移出本群并拉黑`);
                    else return e.reply(`未能将 ${uid}(${nickname}) 移出本群`);
                }
            } catch (err) {
                return e.reply(`本群不存在成员 ${uid}`);
            }
        } else {
            return e.reply("请输入正确的uid哦~");
        }
    }
};
