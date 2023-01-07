import { ModuleConfig } from "../../config";
// title模块默认值
export const titleConfig: TitleConfig = {
    enable: true,
    name: "title",
    permissionList: ["owner", "admin"],
    enableAt: true,
    enableSelf: true,
};

export interface TitleConfig extends ModuleConfig {
    enableSelf: boolean;
}
