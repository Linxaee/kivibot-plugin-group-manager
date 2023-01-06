import type { GroupEventHandler } from "../types";
// 查看词条处理函数,支持群词条和所有词条
export const getTagHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    // 若是查看当前群词条
    if (!params) {
        const groups = config.accessConfig.accessGroup;
        const gid = e.group_id;
        const curGroup = groups.find(item => item.gid === gid);
        const tags = curGroup?.tags;

        if (tags?.length === 0) return e.reply("当前群聊还没有审批词条，请尽快设置", true);
        const msg = `当前群聊审批词条有:\n${curGroup?.tags.join("、")}`;
        return e.reply(msg, true);
    } else {
        // 若是查看所有群聊词条
        const groups = config.accessConfig.accessGroup;
        let baseMsg = "该bot所在的所有开启群管功能的群聊有如下审批词条:\n";
        groups.forEach((item, index) => {
            const group = plugin.bot?.pickGroup(item.gid);
            let msg =
                index === groups.length - 1
                    ? `${group?.name}(${group?.gid}):${item.tags.join("、")}\n`
                    : `${group?.name}(${group?.gid}):${item.tags.join("、")}\n`;
            baseMsg += msg;
        });
        return e.reply(baseMsg, true);
    }
};
