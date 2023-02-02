import type { GroupEventHandler } from "../../types";
import { getGroupConfig, roleAuth } from "../../../utils";
export const setRefuseMsgHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    
    const refuseMsg = argMsg;
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    const groupConfig = getGroupConfig(e, config);
    const { permissionList } = groupConfig!.accessConfig;
    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    
    groupConfig.accessConfig.setting.refuseMsg = refuseMsg;
    e.reply(`已成功将黑名单默认拒绝理由设置为 ${refuseMsg}`);
    plugin.saveConfig(config);
};
