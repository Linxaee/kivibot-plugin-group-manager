import { GroupMessageEvent, GroupRequestEvent } from "@kivibot/core";
import { GroupConfig, GroupManagerConfig, ModuleConfig } from "../config";
import { ModuleName, moduleMap } from "../map";
import { muteAllConfig, adminConfig, titleConfig, muteConfig, accessConfig, removeConfig } from "../module";

export const getGroupConfig = (
    e: GroupRequestEvent | GroupMessageEvent | string | number,
    config: GroupManagerConfig
) => {
    const groupConfigs = config.groupConfigs;

    if (typeof e === "string" || typeof e === "number") {
        return groupConfigs[Number(e)];
    }

    return groupConfigs[e.group_id!];
};
export const getModuleEnable = (group: GroupConfig, moduleName: ModuleName) => {
    const enable = group[`${moduleName}Config`]?.enable;
    return enable;
};
export const getModuleCnName = (module: ModuleConfig) => {
    return moduleMap[module.name];
};
