import { KiviPlugin } from "@kivibot/core";
import { GroupManagerConfig } from "@/config/";
import { AccessConfig } from "../access";
/**
 * @description 当群聊第一次启用插件时，将群号加入各插件启用群聊列表
 * @param plugin 插件实例
 * @param config 插件配置
 * @param gid 群id
 */
export const initHandler = (plugin: KiviPlugin, config: GroupManagerConfig, gid: number) => {
    const entries = Object.entries(config);
    for (let i = 0; i < entries.length; i++) {
        const [module] = entries[i];
        if (["enableGroups", "cmdPrefix"].includes(module)) continue;
        const curModule = (config as any)[module] as AccessConfig;
        // 单独初始化自动审批群聊配置
        if (module === "accessConfig") {
            curModule.accessGroup.push({
                gid,
                admins: [...plugin.admins],
                tags: [],
                blackList: [],
            });
        }
        if (!curModule.groups.includes(gid)) curModule.groups.push(gid);
        plugin.saveConfig(config);
    }
};
