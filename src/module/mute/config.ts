import { ModuleConfig } from "../../config";

export const muteConfig: MuteConfig = {
    enable: true,
    name: "mute",
    permissionList: ["owner", "admin"],
    enableAt: true,
    defaultTime: 3600
};

export interface MuteConfig extends ModuleConfig {
    defaultTime: number;
}
