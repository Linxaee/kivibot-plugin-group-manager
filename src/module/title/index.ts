import { ModuleConfig } from "../../config";
import { GroupEventHandler } from "../types";
import { titleHandler } from "./titleHandler";
import { selfTitleHandler } from "./selfTitleHandler";
import { toggleHandler } from "./toggleHandler";
export const titleConfig: ModuleConfig = {
    permissionList: ["admin", "owner"],
    enableAt: true,
    enableSelf: true,
};
export const titleCommands = new Map<string, GroupEventHandler>([
    ["头衔", titleHandler],
    ["申请头衔", selfTitleHandler],
    [
        "开启申请头衔",
        (e, plugin, config, argMsg) => {
            toggleHandler(e, plugin, config, argMsg, true);
        },
    ],
    [
        "关闭申请头衔",
        (e, plugin, config, argMsg) => {
            toggleHandler(e, plugin, config, argMsg, false);
        },
    ],
]);

export interface TitleConfig extends ModuleConfig {
    enableSelf: boolean;
}
