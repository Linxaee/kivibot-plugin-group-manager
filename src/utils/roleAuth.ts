import type { Group, Client, GroupMessageEvent, KiviPlugin } from "@kivibot/core";
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
 * @description 判断uid是否是bot自身
 * @param uid uid
 * @param bot bot实例
 */
export const ifSelf = (uid: number, bot: Client) => {
    return uid === bot.uin;
};
