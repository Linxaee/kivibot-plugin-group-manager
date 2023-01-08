import { GroupMessageEvent, GroupRequestEvent } from "@kivibot/core";
import { GroupConfig, GroupManagerConfig, ModuleConfig } from "../config";
import { ModuleName, moduleMap } from "../map";

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
    return group[`${moduleName}Config`].enable;
};
export const getModuleCnName = (module: ModuleConfig) => {
    return moduleMap[module.name];
};
