import type { GroupEventHandler, commandInterceptor } from "../types";
import { muteHandler, setMuteTimeHandler } from "./handler";
import { muteConfig } from "./config";
import { getGroupConfig, getModuleCnName, getModuleEnable } from "../../utils";
export const muteCommands: commandInterceptor = (e, config, cmd) => {
    const groupConfig = getGroupConfig(e, config);
    const map = new Map<string, GroupEventHandler>([
        [
            "禁",
            (e, plugin, config, argMsg) => {
                muteHandler(e, plugin, config, argMsg, true);
            }
        ],
        [
            "解",
            (e, plugin, config, argMsg) => {
                muteHandler(e, plugin, config, argMsg, false);
            }
        ],
        [
            "默认禁言",
            (e, plugin, config, argMsg) => {
                setMuteTimeHandler(e, plugin, config, argMsg);
            }
        ]
    ]);
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(groupConfig!, muteConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(muteConfig)}模块`) as any;
    return map;
};
