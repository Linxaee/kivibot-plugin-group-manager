import type { GroupRole } from "@kivibot/core";
import {
    muteAllConfig,
    adminConfig,
    muteConfig,
    titleConfig,
    accessConfig,
    TitleConfig,
    AccessConfig,
} from "../module";
export const roleList: GroupRole[] = ["admin", "owner", "member"];
// 配置默认值
export const config: GroupManagerConfig = {
    enableGroups: [],
    cmdPrefix: "/",
    muteAllConfig,
    adminConfig,
    titleConfig,
    muteConfig,
    accessConfig,
};

// 插件配置
export interface GroupManagerConfig {
    // 可用群聊
    enableGroups: number[];
    // 指令前缀
    cmdPrefix: string;
    muteAllConfig: ModuleConfig;
    adminConfig: ModuleConfig;
    titleConfig: TitleConfig;
    muteConfig: ModuleConfig;
    accessConfig: AccessConfig;
}

// 模块基础配置
export interface ModuleConfig {
    // 模块名
    name: string;
    // 启用该模块的群聊
    groups: number[];
    // 使用权限集
    permissionList: GroupRole[];
    // 是否支持At触发
    enableAt?: boolean;
}
