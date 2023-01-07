import type { GroupEventHandler, commandInterceptor } from "../types";
import { muteHandler } from "./handler/muteHandler";
import { muteConfig } from "./config";
import { getGroupFromCfg, getModuleCnName, getModuleEnable } from "../../utils";
export const muteCommands: commandInterceptor = (e, config, cmd) => {
    const group = getGroupFromCfg(e, config);
    const map = new Map<string, GroupEventHandler>([
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
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(group!, muteConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(muteConfig)}模块`) as any;
    return map;
};
