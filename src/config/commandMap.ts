import type { GroupEventHandler } from "../handler/types";
import { muteAllHandler } from "../handler/muteAllHandler";
import { adminHandler } from "../handler/adminHandler";
import { titleHandler } from "../handler/titleHandler";
import { muteHandler } from "../handler/muteHandler";
export const commandMap = new Map<string, GroupEventHandler>([
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
    ["头衔", titleHandler],
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
