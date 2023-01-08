import type { GroupConfig, GroupManagerConfig } from "../../config";
import { moduleMap, ModuleName } from "../../map";
import { KiviPlugin } from "@kivibot/core";
import { muteAllConfig } from "../muteAll/config";
import { adminConfig } from "../admin/config";
import { titleConfig } from "../title/config";
import { muteConfig } from "../mute/config";
import { accessConfig } from "../access/config";

/**
 * @description 当群聊第一次启用插件时，将该群加入插件群聊配置
 * @param plugin 插件实例
 * @param config 插件配置
 * @param gid 群id
 */
export const initHandler = (plugin: KiviPlugin, config: GroupManagerConfig, gid: number) => {
    // 若存在则存入
    if (!config.groupConfigs.find(group => group.gid === gid)) {
        // 构造初始化对象
        const newGroup: GroupConfig = {
            gid,
            cmdPrefix: "/",
            enableModules: Object.keys(moduleMap) as ModuleName[],
            muteAllConfig,
            muteConfig,
            adminConfig,
            titleConfig,
            accessConfig,
        };
        newGroup.accessConfig.setting = {
            admins: [...plugin.admins],
            tags: [],
            blackList: [],
        };
        config.groupConfigs.push(newGroup);
    }
    plugin.saveConfig(config);
};
