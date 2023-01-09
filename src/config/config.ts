import type { GroupRole } from "@kivibot/core";
import type { GroupConfigs, GroupsCluster } from "./types";
import { ModuleName } from "../map";

export const roleList: GroupRole[] = ["admin", "owner", "member"];
//@ts-ignore
const { version } = require("../../package.json");

// 配置默认值
export const config: GroupManagerConfig = {
    configVersion: version,
    enableGroups: [],
    enableGroupsCluster: [],
    groupConfigs: {},
    groupsCluster: {},
    globalBlackList: [],
};

// 插件配置
export interface GroupManagerConfig {
    // 配置版本
    configVersion: string;
    // 启用插件的群组
    enableGroups: number[];
    // 启用集群的群组
    enableGroupsCluster: number[];
    // 启用普通群组的配置
    groupConfigs: GroupConfigs;
    // 集群对象
    groupsCluster: GroupsCluster;
    // 全局黑名单
    globalBlackList: number[];
}

// 模块基础配置
export interface ModuleConfig {
    // 当前模块是否启用
    enable: boolean;
    // 模块名
    name: ModuleName;
    // 使用权限集
    permissionList: GroupRole[];
    // 是否支持At触发
    enableAt?: boolean;
}
