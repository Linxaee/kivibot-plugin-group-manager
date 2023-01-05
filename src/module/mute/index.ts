import { ModuleConfig } from "../../config";
import { GroupEventHandler } from "../types";
import { muteHandler } from "./muteHandler";
export const muteConfig: ModuleConfig = {
    permissionList: ["admin", "owner"],
    enableAt: true,
};
export const muteCommands = new Map<string, GroupEventHandler>([
    [
        "禁",
        (e, plugin, config, argMsg) => {
            muteHandler(e, plugin, config, argMsg, true);
        },
    ],
    [
        "解",
        (e, plugin, config, argMsg) => {
            muteHandler(e, plugin, config, argMsg, false);
        },
    ],
]);
