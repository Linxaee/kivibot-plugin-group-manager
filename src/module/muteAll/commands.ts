import type { GroupEventHandler, commandInterceptor } from "../types";
import { muteAllHandler } from "./handler/muteAllHandler";
import { muteAllConfig } from "./config";
import { getGroupFromCfg, getModuleEnable, getModuleCnName } from "../../utils";
// muteAll模块普通指令
export const muteAllCommands: commandInterceptor = (e, config, cmd) => {
    const group = getGroupFromCfg(e, config);
    const map = new Map<string, GroupEventHandler>([
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
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(group!, muteAllConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(muteAllConfig)}模块`) as any;

    return map;
};
