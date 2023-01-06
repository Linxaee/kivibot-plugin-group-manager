import type { GroupEventHandler } from "../types";
import { validateNumber } from "../../utils";
// 查看词条处理函数,支持群词条和所有词条
export const setTagHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    const { scope, handle } = params;
    // 若是设置当前群词条
    if (scope === "group") {
        // 处理添加操作
        if (handle === "add") {
            const groups = config.accessConfig.accessGroup;
            const gid = e.group_id;
            const curGroup = groups.find(item => item.gid === gid);
            // 获取参数中的新词条
            const newTags = argMsg.split(" ");
            // 成功添加的词条
            const successTag: string[] = [];
            // tag长度是否过长
            let exceed: boolean = false;
            newTags.forEach(tag => {
                if (tag.length > 10) exceed = true;
                if (tag && tag.length < 10 && !curGroup?.tags.includes(tag)) {
                    curGroup?.tags.push(tag);
                    successTag.push(tag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0) return e.reply("本次添加没有新增词条", true);
            return e.reply(
                `成功添加审批词条:${successTag.join("、")}${
                    exceed ? "\n检测到有词条过长,设置词条请在10个字符以内" : ""
                }`,
                true
            );
        } else {
            // 处理刪除操作
            const groups = config.accessConfig.accessGroup;
            const gid = e.group_id;
            const curGroup = groups.find(item => item.gid === gid);
            // 获取参数中的老词条
            const oldTags = argMsg.split(" ");
            // 成功刪除的词条
            const successTag: string[] = [];
            oldTags.forEach(oldTag => {
                if (curGroup?.tags.includes(oldTag)) {
                    const idx = curGroup?.tags.findIndex(tag => oldTag === tag);
                    curGroup.tags.splice(idx, 1);
                    successTag.push(oldTag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0) return e.reply("本次刪除没有移除旧词条", true);
            return e.reply(`成功移除审批词条:${successTag.join("、")}`, true);
        }
    } else {
        // 若是设置指定群聊词条
        const group_id = argMsg.split(" ")[0];
        if (!validateNumber(group_id)) return e.reply("请输入正确的群号哦", true);
        // 处理添加操作
        if (handle === "add") {
            const groups = config.accessConfig.accessGroup;
            const gid = Number(group_id);
            // 当前模块群对象
            const curAccessGroup = groups.find(item => item.gid === gid);
            // 当前群对象
            const group = plugin.bot?.pickGroup(gid);
            if (!curAccessGroup) return e.reply("指定群聊尚未开启群管插件", true);
            // 获取参数中的新词条
            const newTags = argMsg.split(" ").slice(1);
            // 成功添加的词条
            const successTag: string[] = [];
            // tag长度是否过长
            let exceed: boolean = false;
            newTags.forEach(tag => {
                if (tag.length > 10) exceed = true;
                if (tag && tag.length < 10 && !curAccessGroup?.tags.includes(tag)) {
                    curAccessGroup?.tags.push(tag);
                    successTag.push(tag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0) return e.reply("群 ${group?.name}(${gid}) 本次添加没有新增词条", true);
            return e.reply(
                `群 ${group?.name}(${gid}) 成功添加审批词条:${successTag.join("、")}${
                    exceed ? "\n检测到有词条过长,设置词条请在10个字符以内" : ""
                }`,
                true
            );
        } else {
            // 处理刪除操作
            const groups = config.accessConfig.accessGroup;
            const gid = Number(group_id);
            // 当前模块群对象
            const curAccessGroup = groups.find(item => item.gid === gid);
            // 当前群对象
            const group = plugin.bot?.pickGroup(gid);
            if (!curAccessGroup) return e.reply("指定群聊尚未开启群管插件", true);
            // 获取参数中的老词条
            const oldTags = argMsg.split(" ");
            // 成功刪除的词条
            const successTag: string[] = [];
            oldTags.forEach(oldTag => {
                if (curAccessGroup?.tags.includes(oldTag)) {
                    const idx = curAccessGroup?.tags.findIndex(tag => oldTag === tag);
                    curAccessGroup.tags.splice(idx, 1);
                    successTag.push(oldTag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0) return e.reply("群 ${group?.name}(${gid}) 本次刪除没有移除旧词条", true);
            return e.reply(`群 ${group?.name}(${gid}) 成功移除审批词条:${successTag.join("、")}`, true);
        }
    }
};
