import type { GroupEventHandler, commandInterceptor } from "../types";
import { adminHandler } from "./handler/adminHandler";
import { adminConfig } from "./config";
// admin模块普通指令
export const adminCommands: commandInterceptor = (e, config, cmd) => {
    const map = new Map<string, GroupEventHandler>([
        [
            "管理+",
            (e, plugin, config, argMsg) => {
                adminHandler(e, plugin, config, argMsg, true);
            },
        ],
        [
            "管理-",
            (e, plugin, config, argMsg) => {
                adminHandler(e, plugin, config, argMsg, false);
            },
        ],
    ]);
    // 若map中存在指令且没开启则回复
    if (!config.adminConfig.groups.includes(e.group_id) && map.has(cmd))
        return e.reply(`本群尚未启用${adminConfig.name}模块`) as any;
    return map;
};
