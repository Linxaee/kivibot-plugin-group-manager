import { GroupRole } from "@kivibot/core";
export const roleList: GroupRole[] = ["admin", "owner", "member"];
// 默认配置
export const config: GroupManagerConfig = {
    enableGroups: [],
    cmdPrefix: "/",
    muteAllConfig: {
        permissionList: ["admin", "owner"],
    },
    adminConfig: {
        permissionList: ["admin", "owner"],
        enableAt: true,
    },
    titleConfig: {
        permissionList: ["admin", "owner"],
        enableAt: true,
    },
};

export interface GroupManagerConfig {
    // 可用群聊
    enableGroups: number[];
    // 指令前缀
    cmdPrefix: string;
    muteAllConfig: ModuleConfig;
    adminConfig: ModuleConfig;
    titleConfig: ModuleConfig;
}
export interface ModuleConfig {
    // 使用权限集
    permissionList: GroupRole[];
    // 是否支持At触发
    enableAt?: boolean;
}
