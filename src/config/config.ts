import { GroupRole } from "@kivibot/core";
export const roleList: GroupRole[] = ["admin", "owner", "member"];
// 默认配置
export const config: GroupManagerConfig = {
	enableGroups: [],
	adminConfig: {
		permissionList: ["admin", "owner"],
		enableAt: true,
	},
	muteConfig: {
		permissionList: ["admin", "owner"],
	},
	titleConfig: {
		permissionList: ["admin", "owner"],
		enableAt: true,
	},
};

export interface GroupManagerConfig {
	enableGroups: number[];
	adminConfig: ModuleConfig;
	muteConfig: ModuleConfig;
	titleConfig: ModuleConfig;
}
export interface ModuleConfig {
	// 使用权限集
	permissionList: GroupRole[];
	// 是否支持At触发
	enableAt?: boolean;
}
