import type { GroupEventHandler } from "../../../module/types";
import { getGroupConfig, roleAuth, validateNumber } from "../../../utils";
// 查看词条处理函数,支持群词条和所有词条
export const setTagHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    const { scope, handle } = params;
    const sender_id = e.sender.user_id;
    let groupConfig = getGroupConfig(e, config);
    // 消息发送人的uid
    if (e.message_type === "group") {
        const { permissionList } = groupConfig!.accessConfig;
        // 发送者若不在权限组中且不是bot管理员则返回
        if (!permissionList?.includes(e.sender.role) && !roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    } else {
        // 发送者若不在权限组中且不是bot管理员则返回
        if (!roleAuth.senderIsBotAdmin(plugin, sender_id)) return;
    }
    // 若是设置当前群词条
    if (scope === "group") {
        // 处理添加操作
        if (handle === "add") {
            const setting = groupConfig?.accessConfig.setting;
            // 获取参数中的新词条
            // const newTags = argMsg.split(" ");
            let newTags = undefined;
            if (e.recall === null) newTags = argMsg.split(" ").slice(0, -1);
            else newTags = argMsg.split(" ");
            // 成功添加的词条
            const successTag: string[] = [];
            // tag长度是否过长
            let exceed: boolean = false;
            newTags.forEach(tag => {
                if (tag.length > 10) exceed = true;
                if (tag && tag.length < 10 && !setting?.tags.includes(tag)) {
                    setting?.tags.push(tag);
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
            const setting = groupConfig?.accessConfig.setting;
            // 获取参数中的老词条
            const oldTags = argMsg.split(" ");
            // 成功刪除的词条
            const successTag: string[] = [];
            oldTags.forEach(oldTag => {
                if (setting?.tags.includes(oldTag)) {
                    const idx = setting?.tags.findIndex(tag => oldTag === tag);
                    setting.tags.splice(idx, 1);
                    successTag.push(oldTag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0) return e.reply("本次刪除没有移除旧词条", true);
            return e.reply(`成功移除审批词条:${successTag.join("、")}`, true);
        }
    } else {
        // 若是设置指定群组词条
        const group_id = argMsg.split(" ")[0];
        if (!validateNumber(group_id)) return e.reply("请输入正确的群号哦", true);
        // 处理添加操作
        if (handle === "add") {
            const aimGid = Number(group_id);
            // 指定群组对象
            const aimGroup = plugin.bot?.pickGroup(aimGid);
            if (!getGroupConfig(aimGid, config)) return e.reply("指定群组尚未开启群管插件", true);
            // 当前模块群对象
            const groupConfig = getGroupConfig(aimGid, config);
            const setting = groupConfig?.accessConfig.setting;
            // 获取参数中的新词条
            const newTags = argMsg.split(" ").slice(1);
            // 成功添加的词条
            const successTag: string[] = [];
            // tag长度是否过长
            let exceed: boolean = false;
            newTags.forEach(tag => {
                if (tag.length > 10) exceed = true;
                if (tag && tag.length < 10 && !setting?.tags.includes(tag)) {
                    setting?.tags.push(tag);
                    successTag.push(tag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0) return e.reply("群 ${group?.name}(${gid}) 本次添加没有新增词条", true);
            return e.reply(
                `群 ${aimGroup?.name}(${aimGroup?.gid}) 成功添加审批词条:${successTag.join("、")}${
                    exceed ? "\n检测到有词条过长,设置词条请在10个字符以内" : ""
                }`,
                true
            );
        } else {
            const aimGid = Number(group_id);
            // 指定群组对象
            const aimGroup = plugin.bot?.pickGroup(aimGid);
            if (!getGroupConfig(aimGid, config)) return e.reply("指定群组尚未开启群管插件", true);
            // 当前模块群对象
            const groupConfig = getGroupConfig(aimGid, config);
            const setting = groupConfig?.accessConfig.setting;
            // 获取参数中的老词条
            const oldTags = argMsg.split(" ");
            // 成功刪除的词条
            const successTag: string[] = [];
            oldTags.forEach(oldTag => {
                if (setting?.tags.includes(oldTag)) {
                    const idx = setting?.tags.findIndex(tag => oldTag === tag);
                    setting.tags.splice(idx, 1);
                    successTag.push(oldTag);
                }
            });
            plugin.saveConfig(config);
            if (successTag.length === 0)
                return e.reply(`群 ${aimGroup?.name}(${aimGroup?.gid}) 本次刪除没有移除旧词条`, true);
            return e.reply(`群 ${aimGroup?.name}(${aimGroup?.gid}) 成功移除审批词条:${successTag.join("、")}`, true);
        }
    }
};
