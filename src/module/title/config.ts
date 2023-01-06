import { ModuleConfig } from "@/config";
// title模块默认值
export const titleConfig: TitleConfig = {
    name: "设置头衔",
    groups: [],
    permissionList: ["admin", "owner"],
    enableAt: true,
    enableSelf: true,
};

export interface TitleConfig extends ModuleConfig {
    enableSelf: boolean;
}
