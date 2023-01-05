import type { GroupEventHandler } from "./types";
import { selfNoAuthMsg, roleAuth } from "../utils";
export const muteAllHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象
    const group = e.group;
    const { permissionList } = config.muteAllConfig;
    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    // bot若不是管理员或群主则发送
    if (!roleAuth.selfIsGroupAdmin(group) && !roleAuth.selfIsGroupOwner(group)) return e.reply(selfNoAuthMsg);
    else {
        if (params) {
            // 若已在群员禁言状态
            if (group.all_muted) return e.reply("已在全员禁言状态,请勿重复开启");
            else {
                group.muteAll(true);
                return e.reply("已开启全员禁言");
            }
        } else {
            // 若尚未开启全员禁言
            if (!group.all_muted) return e.reply("尚未开启全员禁言,无需关闭");
            else {
                group.muteAll(false);
                return e.reply("已关闭全员禁言");
            }
        }
    }
};
