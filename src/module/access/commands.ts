import { BotAdminCmdHandler, GroupEventHandler, commandInterceptor } from "../../module/types";
import {
    getAdminHandler,
    getTagHandler,
    setAdminHandler,
    setTagHandler,
    blackListHandler,
    getBlacklistHandler,
    setRefuseMsgHandler
} from "./handler";
import { accessConfig } from "./config";
import { getGroupConfig, getModuleCnName, getModuleEnable } from "../../utils";

// access模块普通指令
export const accessCommands: commandInterceptor = (e, config, cmd) => {
    const groupConfig = getGroupConfig(e, config);
    // 若开启集群则屏蔽
    // 发送者若不在权限组中且不是bot管理员则返回
    const map = new Map<string, GroupEventHandler>([
        [
            "查看词条",
            (e, plugin, config, argMsg) => {
                getTagHandler(e, plugin, config, argMsg, false);
            }
        ],
        [
            "词条+",
            (e, plugin, config, argMsg) => {
                setTagHandler(e, plugin, config, argMsg, { scope: "group", handle: "add" });
            }
        ],
        [
            "词条-",
            (e, plugin, config, argMsg) => {
                setTagHandler(e, plugin, config, argMsg, { scope: "group", handle: "remove" });
            }
        ],
        [
            "黑+",
            (e, plugin, config, argMsg) => {
                blackListHandler(e, plugin, config, argMsg, { scope: "group", handle: "add" });
            }
        ],
        [
            "黑-",
            (e, plugin, config, argMsg) => {
                blackListHandler(e, plugin, config, argMsg, { scope: "group", handle: "remove" });
            }
        ],
        [
            "分管+",
            (e, plugin, config, argMsg) => {
                setAdminHandler(e, plugin, config, argMsg, true);
            }
        ],
        [
            "分管-",
            (e, plugin, config, argMsg) => {
                setAdminHandler(e, plugin, config, argMsg, false);
            }
        ],
        [
            "查看分管",
            (e, plugin, config, argMsg) => {
                getAdminHandler(e, plugin, config, argMsg, false);
            }
        ],
        [
            "查看黑名单",
            (e, plugin, config, argMsg) => {
                getBlacklistHandler(e, plugin, config, argMsg, false);
            }
        ],
        [
            "拒绝理由",
            (e, plugin, config, argMsg) => {
                setRefuseMsgHandler(e, plugin, config, argMsg, false);
            }
        ]
    ]);
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(groupConfig!, accessConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(accessConfig)}模块`) as any;
    else if (groupConfig.accessConfig.enableCluster && map.has(cmd))
        return e.reply(`本群已开启集群功能，请使用集群指令。`) as any;
    return map;
};

// access模块管理员指令
export const accessAdminCmd = new Map<string, BotAdminCmdHandler>([
    [
        "所有词条",
        (e, plugin, config, params) => {
            getTagHandler(e as any, plugin, config, params.join(" "), true);
        }
    ],
    [
        "指定词条+",
        (e, plugin, config, params) => {
            setTagHandler(e as any, plugin, config, params.join(" "), { scope: "global", handle: "add" });
        }
    ],
    [
        "指定词条-",
        (e, plugin, config, params) => {
            setTagHandler(e as any, plugin, config, params.join(" "), { scope: "global", handle: "remove" });
        }
    ],
    [
        "所有分管",
        (e, plugin, config, params) => {
            getAdminHandler(e as any, plugin, config, params.join(" "), true);
        }
    ],
    [
        "所有黑名单",
        (e, plugin, config, params) => {
            getBlacklistHandler(e as any, plugin, config, params.join(" "), true);
        }
    ],
    [
        "全局黑+",
        (e, plugin, config, params) => {
            blackListHandler(e as any, plugin, config, params.join(" "), { scope: "global", handle: "add" });
        }
    ],
    [
        "全局黑-",
        (e, plugin, config, params) => {
            blackListHandler(e as any, plugin, config, params.join(" "), { scope: "global", handle: "remove" });
        }
    ]
]);
