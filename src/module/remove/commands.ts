import type { GroupEventHandler, commandInterceptor } from "../types";
import { removeHandler } from "./handler/removeHandler";
import { removeConfig } from "./config";
import { getGroupConfig, getModuleCnName, getModuleEnable } from "../../utils";
// admin模块普通指令
export const removeCommands: commandInterceptor = (e, config, cmd) => {
    const groupConfig = getGroupConfig(e, config);
    const map = new Map<string, GroupEventHandler>([
        [
            "踢",
            (e, plugin, config, argMsg) => {
                removeHandler(e, plugin, config, argMsg, true);
            },
        ],
        [
            "黑",
            (e, plugin, config, argMsg) => {
                removeHandler(e, plugin, config, argMsg, false);
            },
        ],
    ]);
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(groupConfig!, removeConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(removeConfig)}模块`) as any;
    return map;
};
