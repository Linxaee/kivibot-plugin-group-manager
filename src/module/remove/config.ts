import { ModuleConfig } from "../../config";
// remove模块配置默认值
export const removeConfig: ModuleConfig = {
    enable: true,
    name: "remove",
    permissionList: ["owner", "admin"],
    enableAt: true,
};
