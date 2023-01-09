import { GroupManagerConfig } from "../config";
import { KiviPlugin, PluginDataDir } from "@kivibot/core";
import { getGroupConfig } from "./utils";
import { ModuleName, moduleMap, moduleDefaultConfigMap } from "../map";

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

/**
 * @description 验证版本是否小于1.3.5
 * @param plugin 插件实例
 * @param config 插件配置
 * @returns
 */
export const validateConfigVersion = (plugin: KiviPlugin, config: GroupManagerConfig) => {
    const oldVersion = plugin.loadConfig().configVersion;
    if (!oldVersion || oldVersion < "1.3.5") {
        // 监测插件版本是否正确
        fs.writeFileSync(PluginDataDir + "/group-manager/config.json", JSON.stringify(config));
        const admins = plugin.admins;
        admins.forEach(uid => {
            const msg = `💥检测到插件配置版本落后,现重新初始化插件配置。💥
请重新再需要开启群管功能的群组使用/gmc on开启功能
带来不便，非常抱歉！`;
            plugin.bot?.sendPrivateMsg(uid, msg);
        });
    }
};

/**
 * 遍历群配置，检查每一个群是否缺少模块配置
 * @description 验证插件配置完整性，补全缺少的模块默认配置
 * @param plugin 插件实例
 * @param config 插件配置
 * @returns
 */
export const validateIntegrality = (plugin: KiviPlugin, config: GroupManagerConfig) => {
    const groupConfigs = config.groupConfigs;
    const keys = Object.keys(groupConfigs);
    const modules = Object.keys(moduleMap);
    keys.forEach(key => {
        const groupConfig = groupConfigs[Number(key)];
        modules.forEach(moduleName => {
            if (typeof groupConfig[`${moduleName as ModuleName}Config`] === "undefined") {
                (groupConfig[`${moduleName as ModuleName}Config`] as any) =
                    moduleDefaultConfigMap[`${moduleName as ModuleName}Config`];
            }
        });
        plugin.saveConfig(config);
    });
};
