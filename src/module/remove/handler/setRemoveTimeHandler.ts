import type { GroupEventHandler } from "../../types";
import { validateNumber, getGroupConfig, formatSeconds } from "../../../utils";
export const setRemoveTimeHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    const defaultTime = argMsg;
    // 若数字不合法
    if (!validateNumber(defaultTime)) return e.reply("参数不合法,请输入小时为单位的纯数字", true);
    const groupConfig = getGroupConfig(e, config);
    groupConfig.removeConfig.defaultBlockTime = Number(defaultTime);
    e.reply(`已成功将默认拉黑时长设置为${formatSeconds(Number(defaultTime) * 60 * 60)}`);
    plugin.saveConfig(config);
};
