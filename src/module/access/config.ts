import { ModuleConfig } from "../../config";
// access模块配置默认值
export const accessConfig: AccessConfig = {
    enable: true,
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
    setting: AccessSetting;
}
// access模块启用群组对象
export interface AccessSetting {
    admins: number[];
    tags: string[];
    blackList: number[];
}
