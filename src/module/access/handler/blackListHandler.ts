import type { GroupEventHandler } from "../../../module/types";
import { getGroupConfig, validateNumber } from "../../../utils";
import { validateUid } from "../../../utils/validate";
// 查看词条处理函数,支持群词条和所有词条
export const blackListHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    const { scope, handle } = params;
    // 若是设置当前群词条
    if (scope === "group") {
        // 处理添加操作
        if (handle === "add") {
            const groupConfig = getGroupConfig(e, config);
            const setting = groupConfig?.accessConfig.setting;
            // 获取参数中的新uid
            const newUid = argMsg.split(" ");
            // 成功添加的词条
            const success: string[] = [];
            // 未查找到的数组
            let missCount = 0;
            let missMsg = `\n有以下qq号不存在该用户:`;
            for (let i = 0; i < newUid.length; i++) {
                const uid = newUid[i];
                // 检查uid是否合法
                if (!validateUid(uid)) continue;
                if (!setting?.blackList.includes(Number(uid))) {
                    // 检查user是否存在
                    try {
                        const user = plugin.bot?.pickUser(Number(uid));
                        if (!user) continue;
                        const info = await user.getSimpleInfo();
                        setting?.blackList.push(Number(uid));
                        success.push(`${info.nickname}(${info.user_id})`);
                    } catch (err) {
                        missCount++;
                        missMsg += `${uid}、`;
                    }
                }
            }
            plugin.saveConfig(config);

            if (success.length === 0) return e.reply("本次添加没有新增新黑名单成员，", true);
            return e.reply(
                `成功添加本群黑名单成员:${success.join("、")}${
                    missCount !== 0 ? missMsg.slice(0, missMsg.length - 1) : ""
                }`,
                true
            );
        } else {
            // 处理刪除操作
            const groupConfig = getGroupConfig(e, config);
            const setting = groupConfig?.accessConfig.setting;
            // 获取参数中的新uid
            const oldUid = argMsg.split(" ");
            // 成功添加的词条
            const successUid: string[] = [];
            for (let i = 0; i < oldUid.length; i++) {
                const cur = oldUid[i];
                // 检查uid是否合法
                if (!validateUid(cur)) continue;
                const user = plugin.bot?.pickUser(Number(cur));
                // 检查usr是否存在
                const info = await user!.getSimpleInfo();
                if (setting?.blackList.includes(Number(cur))) {
                    const idx = setting?.blackList.findIndex(uid => Number(cur) === uid);
                    setting.blackList.splice(idx, 1);
                    successUid.push(`${info.nickname}(${info.user_id})`);
                }
            }
            plugin.saveConfig(config);
            if (successUid.length === 0) return e.reply("本次刪除没有移除黑名单成员", true);
            return e.reply(`成功移除黑名单成员:${successUid.join("、")}`, true);
        }
    } else {
        const globalBlackList = config.globalBlackList;
        // 若是设置全局黑名单
        // 处理添加操作
        if (handle === "add") {
            const newUid = argMsg.split(" ");
            // 成功添加的词条
            const success: string[] = [];
            // 未查找到的数组
            let missCount = 0;
            let missMsg = `\n有以下qq号不存在该用户:`;
            for (let i = 0; i < newUid.length; i++) {
                const uid = newUid[i];
                // 检查uid是否合法
                if (!validateUid(uid)) continue;
                if (!globalBlackList.includes(Number(uid))) {
                    // 检查user是否存在
                    try {
                        const user = plugin.bot?.pickUser(Number(uid));
                        if (!user) continue;
                        const info = await user.getSimpleInfo();
                        globalBlackList.push(Number(uid));
                        success.push(`${info.nickname}(${info.user_id})`);
                    } catch (err) {
                        missCount++;
                        missMsg += `${uid}、`;
                    }
                }
            }
            plugin.saveConfig(config);

            if (success.length === 0) return e.reply("本次添加没有新增新全局黑名单成员，", true);
            return e.reply(
                `成功添加全局黑名单成员:${success.join("、")}${
                    missCount !== 0 ? missMsg.slice(0, missMsg.length - 1) : ""
                }`,
                true
            );
        } else {
            // 获取参数中的新uid
            const oldUid = argMsg.split(" ");
            // 成功添加的词条
            const successUid: string[] = [];
            for (let i = 0; i < oldUid.length; i++) {
                const cur = oldUid[i];
                // 检查uid是否合法
                if (!validateUid(cur)) continue;
                const user = plugin.bot?.pickUser(Number(cur));
                const info = await user!.getSimpleInfo();
                if (globalBlackList.includes(Number(cur))) {
                    const idx = globalBlackList.findIndex(uid => Number(cur) === uid);
                    globalBlackList.splice(idx, 1);
                    successUid.push(`${info.nickname}(${info.user_id})`);
                }
            }
            plugin.saveConfig(config);
            if (successUid.length === 0) return e.reply("本次刪除没有移除全局黑名单成员", true);
            return e.reply(`成功移除全局黑名单成员:${successUid.join("、")}`, true);
        }
    }
};
