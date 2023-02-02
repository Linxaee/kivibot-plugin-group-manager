import type { GroupEventHandler } from "../../types";
import { validateNumber, getGroupConfig, formatSeconds, roleAuth } from "../../../utils";
export const setRemoveTimeHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    const groupConfig = getGroupConfig(e, config);
    const { permissionList } = groupConfig!.removeConfig;
    // 发送者若不在权限组中且不是bot管理员则返回
    if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;

    const defaultTime = argMsg;
    // 若数字不合法
    if (!validateNumber(defaultTime)) return e.reply("参数不合法,请输入小时为单位的纯数字", true);
    groupConfig.removeConfig.defaultBlockTime = Number(defaultTime);
    e.reply(`已成功将默认拉黑时长设置为${formatSeconds(Number(defaultTime) * 60 * 60)}`);
    plugin.saveConfig(config);
};
