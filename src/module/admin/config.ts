import { ModuleConfig } from "@/config";
// admin模块配置默认值
export const adminConfig: ModuleConfig = {
    name: "设置管理员",
    groups: [],
    permissionList: ["admin", "owner"],
    enableAt: true,
};
