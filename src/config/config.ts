import type { GroupRole } from "@kivibot/core";
import { ModuleName } from "../map";
import { TitleConfig, AccessConfig } from "../module";
import { ClusterList, ClustersConfig, GroupConfigs, GroupsCluster, TargetClusters } from "./types";
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
    globalBlackListCluster: {},
    globalSpecialCluster: {},
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
    // 启用集群的群组配置
    groupsCluster: GroupsCluster;
    // 全局黑名单
    globalBlackList: number[];
    // 全局集群黑名单
    globalBlackListCluster: ClusterList;
    // 全局集群白名单
    globalSpecialCluster: ClusterList;
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
