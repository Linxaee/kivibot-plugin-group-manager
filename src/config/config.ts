import type { GroupRole } from "@kivibot/core";
import { ModuleName } from "../map";
import { TitleConfig, AccessConfig } from "../module";
export const roleList: GroupRole[] = ["admin", "owner", "member"];
//@ts-ignore
const { version } = require("../../package.json");
console.log(version, typeof version);

// 配置默认值
export const config: GroupManagerConfig = {
    configVersion: version,
    enableGroups: [],
    globalBlackList: [],
    groupConfigs: [],
};

// 插件配置
export interface GroupManagerConfig {
    // 配置版本
    configVersion: number;
    // 可用群聊
    enableGroups: number[];
    groupConfigs: GroupConfig[];
    // 全局黑名单
    globalBlackList: number[];
}

export interface GroupConfig {
    // 群号
    gid: number;
    // 指令前缀
    cmdPrefix: string;
    // 启用的模块
    enableModules: ModuleName[];
    muteAllConfig: ModuleConfig;
    muteConfig: ModuleConfig;
    adminConfig: ModuleConfig;
    titleConfig: TitleConfig;
    accessConfig: AccessConfig;
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
