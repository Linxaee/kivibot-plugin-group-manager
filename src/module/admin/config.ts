import { ModuleConfig } from "../../config";
// admin模块配置默认值
export const adminConfig: ModuleConfig = {
    enable: true,
    name: "admin",
    permissionList: ["owner", "admin"],
    enableAt: true,
};
