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
        blackList: []
    },
    tempBlackList: {}
};
// access模块配置
export interface AccessConfig extends ModuleConfig {
    // 是否启用集群
    enableCluster: boolean;
    // 配置项
    setting: AccessSetting;
    // 群临时黑名单
    tempBlackList: TempBlackList;
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
// 临时黑名单
export interface TempBlockMember {
    // 上一次记录(被踢出、退群、拉黑)的时间
    lastRecordTime: number;
    // 持续时间
    duration: number;
}
export interface TempBlackList {
    [k: number]: TempBlockMember;
}
