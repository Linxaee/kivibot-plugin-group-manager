import { ModuleConfig } from "../../config";
import { GroupEventHandler } from "../types";
import { adminHandler } from "./adminHandler";
export const adminConfig: ModuleConfig = {
    permissionList: ["admin", "owner"],
    enableAt: true,
};
export const adminCommands = new Map<string, GroupEventHandler>([
    [
        "管理+",
        (e, plugin, config, argMsg) => {
            adminHandler(e, plugin, config, argMsg, true);
        },
    ],
    [
        "管理-",
        (e, plugin, config, argMsg) => {
            adminHandler(e, plugin, config, argMsg, false);
        },
    ],
]);
