import { GroupManagerConfig } from "../config";
import { KiviPlugin, PluginDataDir } from "@kivibot/core";
import { moduleMap, groupDefaultConfigMap } from "../map";
import { constructVersionMsg, deepMerge } from "../utils";
import { versionDetails } from "../map";
import { getGroupConfig } from "./utils";
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
    if (num === 0) return true;
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
 * @description 验证版本是否小于1.3.5,已经验证是否发送过版本更新消息
 * @param plugin 插件实例
 * @param config 插件配置
 * @returns
 */
export const validateConfigVersion = (
    newVersion: string,
    oldVersion: string,
    plugin: KiviPlugin,
    config: GroupManagerConfig
) => {
    try {
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
        // 若没发送过版本更新信息
        if (oldVersion !== newVersion) {
            let newConfig = deepMerge(config, plugin.loadConfig());
            console.log(newConfig);

            const { bot } = plugin;
            let groups: number[] = config.enableGroups.concat(config.enableGroupsCluster);
            groups = [...new Set(groups)];
            groups.forEach(group => {
                const groupConfig = getGroupConfig(group, newConfig);

                if (groupConfig.isEnableNewVer) {
                    console.log(constructVersionMsg(newVersion, oldVersion));
                    bot?.sendGroupMsg(group, constructVersionMsg(newVersion, oldVersion));
                }
            });
        }
    } catch {
        plugin.throwPluginError("group-manager: 未通过插件版本验证");
        return plugin.logger.fatal("group-manager: 未通过插件版本验证");
    }
    plugin.logger.info("group-manager: 通过插件版本验证");
};

/**
 * 遍历群配置，检查每一个群是否缺少模块配置
 * @description 验证插件配置完整性，补全缺少的模块默认配置
 * @param plugin 插件实例
 * @param config 插件配置
 * @returns
 */
export const validateIntegrality = (plugin: KiviPlugin, config: GroupManagerConfig) => {
    try {
        const groupConfigs = config.groupConfigs;
        const gids = Object.keys(groupConfigs);
        // 补全整个模块配置
        gids.forEach(gid => {
            // 取到每个群的config
            const groupConfig = groupConfigs[Number(gid)];
            const configKeys = Object.keys(groupDefaultConfigMap);
            configKeys.forEach(configKey => {
                // console.log(configKey);
                // 遍历所有模块名，依次检查该群config中是否含有这些模块配置
                if (configKey.indexOf("Config") != -1) {
                    // 模块配置
                    let moduleConfig = (groupConfig as any)[configKey];
                    // 若模块配置不存在则缺失，进行补全
                    if (typeof moduleConfig === "undefined") {
                        (groupConfig as any)[configKey] = (groupDefaultConfigMap as any)[configKey];
                    } else {
                        const moduleKeys = Object.keys((groupDefaultConfigMap as any)[configKey]);
                        moduleKeys.forEach(defaultKey => {
                            // 检查模块配置属性是否存在
                            let moduleProp = (moduleConfig as any)[defaultKey];
                            if (typeof moduleProp === "undefined") {
                                (moduleConfig as any)[defaultKey] = (groupDefaultConfigMap as any)[configKey][
                                    defaultKey
                                ];
                            }
                        });
                    }
                } else {
                    if (typeof (groupConfig as any)[configKey] === "undefined") {
                        (groupConfig as any)[configKey] = (groupDefaultConfigMap as any)[configKey];
                    }
                }
            });
        });
        plugin.saveConfig(config);
    } catch {
        plugin.throwPluginError("group-manager: 未通过配置完整性验证");
        return plugin.logger.fatal("group-manager: 未通过配置完整性验证");
    }
    return plugin.logger.info("group-manager: 通过配置完整性验证");
};

/**
 * 验证插件配置
 * @description 验证插件配置
 * @param plugin 插件实例
 * @param config 插件配置
 * @returns
 */
export const validatePluginConfig = (newVersion: string, plugin: KiviPlugin, config: GroupManagerConfig) => {
    const oldConfig = plugin.loadConfig();
    const oldVersion = oldConfig.configVersion;
    plugin.saveConfig(deepMerge(config, plugin.loadConfig()));
    validateIntegrality(plugin, config);
    validateConfigVersion(newVersion, oldVersion, plugin, config);
};
