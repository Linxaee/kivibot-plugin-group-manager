import type { BotAdminCmdHandler, GroupEventHandler, commandInterceptor } from "../types";
import { addClusterHandler } from "./handler";
import { getGroupConfig } from "../../utils";
// cluster模块普通指令
export const clusterCommands: commandInterceptor = (e, config, cmd) => {
    const groupConfig = getGroupConfig(e, config);
    const map = new Map<string, GroupEventHandler>([]);

    // 若map中存在指令且没开启则回复
    if (!groupConfig.accessConfig.enableCluster && map.has(cmd)) return e.reply(`本群尚未启用集群`) as any;
    return map;
};
// cluster模块管理员指令
export const clusterAdminCmd = new Map<string, BotAdminCmdHandler>([
    [
        "集群+",
        (e, plugin, config, params) => {
            addClusterHandler(e as any, plugin, config, params.join(" "));
        },
    ],
]);
