import { ModuleConfig } from "../../config";
import { GroupEventHandler } from "../types";
import { muteAllHandler } from "./muteAllHandler";
export const muteAllConfig: ModuleConfig = {
    permissionList: ["admin", "owner"],
};
export const muteAllCommands = new Map<string, GroupEventHandler>([
    [
        "all",
        (e, plugin, config, argMsg) => {
            muteAllHandler(e, plugin, config, argMsg, true);
        },
    ],
    [
        "deall",
        (e, plugin, config, argMsg) => {
            muteAllHandler(e, plugin, config, argMsg, false);
        },
    ],
]);
