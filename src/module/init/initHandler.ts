import type { GroupConfig, GroupManagerConfig } from "../../config";
import { moduleMap, ModuleName } from "../../map";
import { KiviPlugin } from "@kivibot/core";
import { groupDefaultConfigMap } from "../../map";
/**
 * @description 当群组第一次启用插件时，将该群加入插件群组配置
 * @param plugin 插件实例
 * @param config 插件配置
 * @param gid 群id
 */
export const initHandler = (plugin: KiviPlugin, config: GroupManagerConfig, gid: number) => {
    config.enableGroups.push(gid);
    // 若不存在则存入
    if (!config.groupConfigs[gid]) {
        // 构造初始化对象
        const newGroup: GroupConfig = {
            enableModules: Object.keys(moduleMap) as ModuleName[],
            ...groupDefaultConfigMap
        };
        newGroup.accessConfig.setting = {
            admins: [...plugin.admins],
            tags: [],
            blackList: []
        };
        config.groupConfigs[gid] = newGroup;
    }
    plugin.saveConfig(config);
};
