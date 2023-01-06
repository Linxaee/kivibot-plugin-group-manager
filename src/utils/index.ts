import type { Group, GroupMessageEvent, KiviPlugin, AtElem, Client } from "@kivibot/core";
export * from "./validateTitle";
export * from "./deepMerge";
export const selfNoAuthMsg = "本Bot暂无权限哦~";
export const roleAuth = {
    // 判断该uid是否是群管理
    isGroupAdmin: (group: Group, uid: number) => {
        const member = group.pickMember(uid);
        return member.is_admin;
    },
    // 判断该uid是否是群主
    isGroupOwner: (group: Group, uid: number) => {
        const member = group.pickMember(uid);
        return member.is_owner;
    },
    // 判断bot自身是否是群管理
    selfIsGroupAdmin: (group: Group) => {
        return group.is_admin;
    },
    // 判断bot自身是否是群主
    selfIsGroupOwner: (group: Group) => {
        return group.is_owner;
    },
    // 判断发送者是否是群管理
    senderIsGroupAdmin: (e: GroupMessageEvent) => {
        return e.sender.role === "admin";
    },
    // 判断发送者是否是群主
    senderIsGroupOwner: (e: GroupMessageEvent) => {
        return e.sender.role === "owner";
    },
    // 判断发送者是否是bot管理员
    senderIsBotAdmin: (plugin: KiviPlugin, uid: number) => {
        return plugin.admins.includes(uid);
    },
};

/**
 * @description 验证传入的uid是否合法
 * @param uid uid
 */
export const validateUid = (uid: number | string) => {
    if (!uid) return false;
    uid = uid.toString();
    return uid.length <= 11 && !isNaN(Number(uid));
};

/**
 * @description 验证传入的num是否是纯数字
 * @param num 待验证数字
 */
export const validateNumber = (num: number | string) => {
    if (!num) return false;
    return !isNaN(Number(num));
};

/**
 * @description 群消息事件中第一个at的成员uid
 * @param e 群消息事件
 */
export const handleAt = (e: GroupMessageEvent) => {
    const { message } = e;
    const firstAt = message.find(msg => msg.type === "at") as AtElem;
    if (firstAt?.qq === "all") return undefined;
    return firstAt ? firstAt?.qq : undefined;
};

/**
 * @description 判断uid是否是bot自身
 * @param uid uid
 * @param bot bot实例
 */
export const ifSelf = (uid: number, bot: Client) => {
    return uid === bot.uin;
};

/**
 * @description 将秒格式化成分/小时/天/月
 * @param seconds 秒
 * @param bot bot实例
 */
export const formatSeconds = (seconds: number) => {
    let theTime = seconds; // 需要转换的时间秒
    let theTime1 = 0; // 分
    let theTime2 = 0; // 小时
    let theTime3 = 0; // 天
    if (theTime > 60) {
        theTime1 = theTime / 60;
        theTime = theTime % 60;
        if (theTime1 > 60) {
            theTime2 = theTime1 / 60;
            theTime1 = theTime1 % 60;
            if (theTime2 > 24) {
                //大于24小时
                theTime3 = theTime2 / 24;
                theTime2 = theTime2 % 24;
            }
        }
    }
    let result = "";
    if (theTime > 0) {
        result = "" + Math.floor(theTime) + "秒";
    }
    if (theTime1 > 0) {
        result = "" + Math.floor(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + Math.floor(theTime2) + "小时" + result;
    }
    if (theTime3 > 0) {
        result = "" + Math.floor(theTime3) + "天" + result;
    }
    return result;
};
