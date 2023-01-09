import { ModuleConfig } from "../../config";
// access模块配置默认值
export const accessConfig: AccessConfig = {
    enable: true,
    enableCluster: false,
    name: "access",
    permissionList: ["owner", "admin"],
    enableAt: true,
    setting: {
        admins: [],
        tags: [],
        blackList: [],
    },
};
// access模块配置
export interface AccessConfig extends ModuleConfig {
    // 是否启用集群
    enableCluster: boolean;
    // 配置项
    setting: AccessSetting;
}
// 群组配置项
export interface AccessSetting {
    // 分管
    admins: number[];
    // 审批词
    tags: string[];
    // 群黑名单
    blackList: number[];
}
