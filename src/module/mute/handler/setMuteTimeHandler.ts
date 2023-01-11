import type { GroupEventHandler } from "../../types";
import { validateNumber, getGroupConfig, formatSeconds } from "../../../utils";
export const setMuteTimeHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    const defaultTime = argMsg;
    // 若数字不合法
    if (!validateNumber(defaultTime)) return e.reply("参数不合法,请输入分钟为单位的纯数字", true);
    if (Number(defaultTime)*60 > 2592000) return e.reply("禁言最高时长为30天(2592000秒),请重新输入", true);
    const groupConfig = getGroupConfig(e, config);
    groupConfig.muteConfig.defaultTime = Number(defaultTime);
    e.reply(`已成功将默认禁言时长设置为${formatSeconds(Number(defaultTime)*60)}`);
    plugin.saveConfig(config);
};
