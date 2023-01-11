import { ModuleConfig } from "../../config";
// remove模块配置默认值
export const removeConfig: RemoveConfig = {
    enable: true,
    name: "remove",
    permissionList: ["owner", "admin"],
    enableAt: true,
    defaultBlockTime: 24
};

export interface RemoveConfig extends ModuleConfig {
    // 踢出后默认进入临时黑名单的事件(小时为单位)
    defaultBlockTime: number;
}
