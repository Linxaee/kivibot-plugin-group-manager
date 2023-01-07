import type { GroupEventHandler } from "../../types";
import { getGroupFromCfg } from "../../../utils";
export const getBlacklistHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 若查看本群黑名单
    if (!params) {
        const group = getGroupFromCfg(e, config);
        const setting = group?.accessConfig.setting;
        const blackList = setting!.blackList;
        if (blackList?.length === 0) return e.reply("本群黑名单为空", true);
        let msg = `本群当前黑名单有:\n`;
        for (let i = 0; i < blackList.length; i++) {
            const uid = blackList[i];
            const user = plugin.bot?.pickUser(uid);
            const info = await user!.getSimpleInfo();
            msg +=
                i === blackList.length - 1
                    ? `${i + 1}.${info.nickname}(${info.user_id})`
                    : `${i + 1}.${info.nickname}(${info.user_id})\n`;
        }

        return e.reply(msg, true);
    } else {
        // 若查看所有黑名单
        let baseMsg = "该bot所在的所有开启群管功能的群聊有如下黑名单:\n";
        const groups = config.groupConfigs;
        const globalBlackList = config.globalBlackList;
        let globalBlackMsg = "全局黑名单:\n";
        for (let i = 0; i < globalBlackList.length; i++) {
            const uid = globalBlackList[i];
            const user = plugin.bot?.pickUser(uid);
            const info = await user!.getSimpleInfo();
            globalBlackMsg += `\t${info.nickname}(${info.user_id})\n`;
        }
        baseMsg += globalBlackMsg + "\n";
        for (let i = 0; i < groups.length; i++) {
            const item = groups[i];
            const group = plugin.bot?.pickGroup(item.gid);
            const blackList = item.accessConfig.setting.blackList;
            let blackMsg = "";
            for (let j = 0; j < blackList.length; j++) {
                const uid = blackList[j];
                const user = plugin.bot?.pickUser(uid);
                const info = await user!.getSimpleInfo();
                blackMsg +=
                    j === blackList.length - 1
                        ? `\t${info.nickname}(${info.user_id})`
                        : `\t${info.nickname}(${info.user_id})\n`;
            }

            let msg =
                i === groups.length - 1
                    ? `${i + 1}.${group?.name}(${group?.gid}):\n${blackMsg}`
                    : `${i + 1}.${group?.name}(${group?.gid}):\n${blackMsg}\n`;
            baseMsg += msg;
        }
        return e.reply(baseMsg, true);
    }
};
