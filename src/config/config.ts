import type { GroupRole } from "@kivibot/core";
import { muteAllConfig, adminConfig, muteConfig, titleConfig } from "../module";
export const roleList: GroupRole[] = ["admin", "owner", "member"];
// 默认配置值
export const config: GroupManagerConfig = {
    enableGroups: [],
    cmdPrefix: "/",
    muteAllConfig,
    adminConfig,
    titleConfig,
    muteConfig,
};

// 插件配置
export interface GroupManagerConfig {
    // 可用群聊
    enableGroups: number[];
    // 指令前缀
    cmdPrefix: string;
    [k: string]: ModuleConfig | string | number[];
}

// 模块配置
export type ModuleConfig = ModuleBaseConfig & ModulePartConfig;
// 模块基础配置
export interface ModuleBaseConfig {
    // 使用权限集
    permissionList: GroupRole[];
    // 是否支持At触发
    enableAt?: boolean;
}
// 模块单独配置
export interface ModulePartConfig {
    [k: string]: any;
}
