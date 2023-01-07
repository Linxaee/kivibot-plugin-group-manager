import { GroupManagerConfig, ModuleConfig, config } from "../config";
import { KiviPlugin, PluginDataDir, segment } from "@kivibot/core";
//@ts-ignore
const fs = require("fs");
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
 * @description 验证头衔是否符合长度要求
 * @param title 头衔
 * @returns
 */
export const validateTitle = (title: string) => {
    let titleLen = title.replace(/[^x00-xff]/g, "AA").length;
    return !(titleLen > 12);
};

export const validateConfigVersion = (version: string, plugin: KiviPlugin, config: GroupManagerConfig) => {
    if (plugin.loadConfig().configVersion !== version) {
        // 监测插件版本是否正确
        fs.writeFileSync(PluginDataDir + "/group-manager/config.json", JSON.stringify(config));
        const admins = plugin.admins;
        admins.forEach(uid => {
            const msg = `💥检测到插件配置版本落后,现重新初始化插件配置。💥
请重新再需要开启群管功能的群聊使用/gmc on开启功能
带来不便，非常抱歉！`;
            plugin.bot?.sendPrivateMsg(uid, msg);
        });
    } else console.log(5);
};
