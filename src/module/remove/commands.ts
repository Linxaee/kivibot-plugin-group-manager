import type { GroupEventHandler, commandInterceptor } from "../types";
import { removeHandler, setRemoveTimeHandler } from "./handler";
import { removeConfig } from "./config";
import { getGroupConfig, getModuleCnName, getModuleEnable } from "../../utils";
// admin模块普通指令
export const removeCommands: commandInterceptor = (e, config, cmd) => {
    const groupConfig = getGroupConfig(e, config);
    const map = new Map<string, GroupEventHandler>([
        [
            "踢",
            (e, plugin, config, argMsg) => {
                removeHandler(e, plugin, config, argMsg);
            }
        ],
        [
            "默认拉黑",
            (e, plugin, config, argMsg) => {
                setRemoveTimeHandler(e, plugin, config, argMsg);
            }
        ]
    ]);
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(groupConfig!, removeConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(removeConfig)}模块`) as any;
    return map;
};
