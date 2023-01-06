import { ModuleConfig } from "../../config";
import { BotAdminCmdHandler, GroupEventHandler, commandInterceptor } from "../types";
import { getTagHandler } from "./getTagHandler";
import { setTagHandler } from "./setTagHandler";
import { setAdminHandler } from "./setAdminHandler";
import { getAdminHandler } from "./getAdminHandler";
export * from "./accessHandler";
export const accessConfig: AccessConfig = {
    name: "自动审批",
    groups: [],
    permissionList: ["admin", "owner"],
    enableAt: true,
    accessGroup: [],
};
export const accessCommands: commandInterceptor = (e, config, cmd) => {
    const map = new Map<string, GroupEventHandler>([
        [
            "查看词条",
            (e, plugin, config, argMsg) => {
                getTagHandler(e, plugin, config, argMsg, false);
            },
        ],
        [
            "词条+",
            (e, plugin, config, argMsg) => {
                setTagHandler(e, plugin, config, argMsg, { scope: "group", handle: "add" });
            },
        ],
        [
            "词条-",
            (e, plugin, config, argMsg) => {
                setTagHandler(e, plugin, config, argMsg, { scope: "group", handle: "remove" });
            },
        ],
        [
            "分管+",
            (e, plugin, config, argMsg) => {
                setAdminHandler(e, plugin, config, argMsg, true);
            },
        ],
        [
            "分管-",
            (e, plugin, config, argMsg) => {
                setAdminHandler(e, plugin, config, argMsg, false);
            },
        ],
        [
            "查看分管",
            (e, plugin, config, argMsg) => {
                getAdminHandler(e, plugin, config, argMsg, false);
            },
        ],
    ]);
    // 若map中存在指令且没开启则回复
    if (!config.accessConfig.groups.includes(e.group_id) && map.has(cmd))
        return e.reply(`本群尚未启用${accessConfig.name}模块`) as any;
    return map;
};
export const accessAdminCmd = new Map<string, BotAdminCmdHandler>([
    [
        "所有词条",
        (e, plugin, config, params) => {
            getTagHandler(e as any, plugin, config, params.join(" "), true);
        },
    ],
    [
        "指定词条+",
        (e, plugin, config, params) => {
            setTagHandler(e as any, plugin, config, params.join(" "), { scope: "global", handle: "add" });
        },
    ],
    [
        "指定词条-",
        (e, plugin, config, params) => {
            setTagHandler(e as any, plugin, config, params.join(" "), { scope: "global", handle: "remove" });
        },
    ],
    [
        "所有分管",
        (e, plugin, config, params) => {
            getAdminHandler(e as any, plugin, config, params.join(" "), true);
        },
    ],
]);

export interface AccessConfig extends ModuleConfig {
    accessGroup: AccessGroup[];
}
export interface AccessGroup {
    gid: number;
    admins: number[];
    tags: string[];
    blackList: number[];
}
