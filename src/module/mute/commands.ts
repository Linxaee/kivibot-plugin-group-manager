import type { GroupEventHandler, commandInterceptor } from "../types";
import { muteHandler } from "./handler/muteHandler";
import { muteConfig } from "./config";
export const muteCommands: commandInterceptor = (e, config, cmd) => {
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
    if (!config.muteConfig.groups.includes(e.group_id) && map.has(cmd))
        return e.reply(`本群尚未启用${muteConfig.name}模块`) as any;
    return map;
};
