import { ModuleConfig } from "../../config";

export const muteConfig: MuteConfig = {
    enable: true,
    name: "mute",
    permissionList: ["owner", "admin"],
    enableAt: true,
    defaultTime: 60
};

export interface MuteConfig extends ModuleConfig {
    // 默认禁言时间，以分钟为单位
    defaultTime: number;
}
