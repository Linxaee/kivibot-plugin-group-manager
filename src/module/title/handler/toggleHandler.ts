import type { GroupEventHandler } from "../../../module/types";
import type { TitleConfig } from "../config";
import { getGroupConfig, roleAuth } from "../../../utils";

export const toggleHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象
    const groupConfig = getGroupConfig(e, config);
    const { permissionList } = groupConfig!.titleConfig;
    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    // 更改配置
    const titleConfig = groupConfig!.titleConfig as TitleConfig;
    titleConfig.enableSelf = params;
    plugin.saveConfig(config);
    return e.reply(`已${params ? "开启" : "关闭"}自行申请头衔功能`);
};
