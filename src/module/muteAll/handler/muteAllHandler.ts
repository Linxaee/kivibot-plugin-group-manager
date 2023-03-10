import type { GroupEventHandler } from "../../../module/types";
import { selfNoAuthMsg, roleAuth, getGroupConfig } from "../../../utils";
export const muteAllHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象
    const group = e.group;
    const groupConfig = getGroupConfig(e, config);
    const { permissionList } = groupConfig!.muteAllConfig;
    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    // bot若不是管理员或群主则发送
    if (!roleAuth.selfIsGroupAdmin(group) && !roleAuth.selfIsGroupOwner(group)) return e.reply(selfNoAuthMsg);
    else {
        if (params) {
            group.muteAll(true);
            return e.reply("已开启全员禁言");
        } else {
            group.muteAll(false);
            return e.reply("已关闭全员禁言");
        }
    }
};
