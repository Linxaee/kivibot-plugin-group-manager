import type { GroupEventHandler } from "../../../module/types";
import {
    selfNoAuthMsg,
    roleAuth,
    validateUid,
    handleAt,
    validateNumber,
    formatSeconds,
    ifSelf,
    getGroupConfig
} from "../../../utils";
import { randomInt } from "@kivibot/core";
export const muteHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象
    const group = e.group;
    const groupConfig = getGroupConfig(e, config);
    const { permissionList, enableAt, defaultTime } = groupConfig!.muteConfig;
    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    // bot若不是管理员或群主则发送
    if (!roleAuth.selfIsGroupAdmin(group) && !roleAuth.selfIsGroupOwner(group)) return e.reply(selfNoAuthMsg);
    // 禁言逻辑
    else {
        // uid
        let uid: number | string | undefined = undefined;
        // 禁言时间
        let time: number | string | undefined = undefined;
        [uid, time] = argMsg.split(" ");
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
            if (ifSelf(uid, plugin.bot!)) return e.reply(`无法对bot自身进行禁言操作哦`);
            if (roleAuth.isGroupAdmin(group, uid) && !roleAuth.selfIsGroupOwner(group))
                return e.reply(`无法对管理员进行禁言操作哦`);
            try {
                const member = group.pickMember(uid);
                const nickname = member.info!.nickname;
                // 若未指定time则执行默认时间
                if (!time) time = defaultTime;
                console.log(time);

                // 若未指定time，则随机时间
                if (["r", "R", "随机", "随", "random"].includes(time as string)) time = randomInt(1, 2592000);
                else {
                    // 若指定了，则验证time是否为纯数字
                    if (!validateNumber(time) && params) {
                        return e.reply(`请填入正确的禁言时间哦`);
                    } else time = Number(time) > 2592000 ? 2592000 : Number(time);
                }
                // 判断是禁还是解禁
                // 若param为false则直接解禁
                if (!params || time === 0) {
                    // 直接解禁
                    group.muteMember(uid, 0);
                    return e.reply(`已解除${uid}(${nickname})的禁言`);
                } else {
                    group.muteMember(uid, time);
                    return e.reply(`已将${uid}(${nickname})禁言${formatSeconds(time)}`);
                }
            } catch (err) {
                return e.reply(`本群内找不到用户${uid},若此次指令是bot启动后第一条请重新发送一次指令`);
            }
        } else {
            return e.reply("请输入正确的uid哦~");
        }
    }
};
