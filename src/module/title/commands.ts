import type { GroupEventHandler, commandInterceptor } from "../types";
import { selfTitleHandler, titleHandler, toggleHandler } from "./handler";
import { titleConfig } from "./config";
import { getGroupConfig, getModuleCnName, getModuleEnable } from "../../utils";
export const titleCommands: commandInterceptor = (e, config, cmd) => {
    const groupConfig = getGroupConfig(e, config);
    const map = new Map<string, GroupEventHandler>([
        ["头衔", titleHandler],
        ["申请头衔", selfTitleHandler],
        [
            "开启申请头衔",
            (e, plugin, config, argMsg) => {
                toggleHandler(e, plugin, config, argMsg, true);
            },
        ],
        [
            "关闭申请头衔",
            (e, plugin, config, argMsg) => {
                toggleHandler(e, plugin, config, argMsg, false);
            },
        ],
    ]);
    // 若map中存在指令且没开启则回复
    if (!getModuleEnable(groupConfig!, titleConfig.name) && map.has(cmd))
        return e.reply(`本群尚未启用${getModuleCnName(titleConfig)}模块`) as any;
    return map;
};
