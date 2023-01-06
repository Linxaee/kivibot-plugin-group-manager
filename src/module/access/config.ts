import { ModuleConfig } from "@/config";
// access模块配置默认值
export const accessConfig: AccessConfig = {
    name: "自动审批",
    groups: [],
    permissionList: ["admin", "owner"],
    enableAt: true,
    accessGroup: [],
};
// access模块配置
export interface AccessConfig extends ModuleConfig {
    accessGroup: AccessGroup[];
}
// access模块启用群聊对象
export interface AccessGroup {
    gid: number;
    admins: number[];
    tags: string[];
    blackList: number[];
}
