import type { GroupEventHandler } from "../../../module/types";
import { getGroupConfig, roleAuth } from "../../../utils";
// 查看词条处理函数,支持群词条和所有词条
export const getTagHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    const sender_id = e.sender.user_id;
    if (e.message_type === "group") {
        // 消息发送人的uid
        const groupConfig = getGroupConfig(e, config);
        const { permissionList } = groupConfig!.accessConfig;
        // 发送者若不在权限组中且不是bot管理员则返回
        if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    } else {
        // 发送者若不是bot管理员则返回
        if (!roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    }

    // 若是查看当前群词条
    if (!params) {
        const groupConfig = getGroupConfig(e, config);
        const setting = groupConfig?.accessConfig.setting;
        const tags = setting?.tags;
        if (tags?.length === 0) return e.reply("当前群组还没有审批词条，请尽快设置", true);
        const msg = `当前群组审批词条有:\n${setting?.tags.join("、")}`;
        return e.reply(msg, true);
    } else {
        // 若是查看所有群组词条
        let baseMsg = "该bot所在的所有开启群管功能的群组有如下审批词条:\n";
        const groupConfigs = config.groupConfigs;
        const groupKeys = Object.keys(groupConfigs).map(key => Number(key));
        groupKeys.forEach((key, index) => {
            const groupConfig = groupConfigs[key];
            const group = plugin.bot?.pickGroup(key);
            let msg =
                index === groupKeys.length - 1
                    ? `${group?.name}(${group?.gid}):${groupConfig.accessConfig.setting.tags.join("、")}\n`
                    : `${group?.name}(${group?.gid}):${groupConfig.accessConfig.setting.tags.join("、")}\n`;
            baseMsg += msg;
            index++;
        });
        return e.reply(baseMsg, true);
    }
};
