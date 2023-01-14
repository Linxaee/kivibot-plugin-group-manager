import type { GroupEventHandler } from "../../types";
import { getGroupConfig } from "../../../utils";
export const setRefuseMsgHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    const refuseMsg = argMsg;
    const groupConfig = getGroupConfig(e, config);
    groupConfig.accessConfig.setting.refuseMsg = refuseMsg;
    e.reply(`已成功将黑名单默认拒绝理由设置为 ${refuseMsg}`);
    plugin.saveConfig(config);
};
