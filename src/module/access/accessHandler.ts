import type { AccessHandler } from "../types";
import { GroupRequestEvent, KiviPlugin } from "@kivibot/core";
export const accessHandler: AccessHandler = (plugin, e, group) => {
    // 获取uid,gid,申请消息
    const { user_id, group_id, comment } = e;
    // 获取黑名单,分管员,审批关键词
    const { blackList, admins, tags } = group;
    // 若申请人在黑名单中
    if (blackList.includes(user_id)) {
        // 拒绝并发送消息
        sendToAdmins(plugin, group_id, admins, constructMsg(e, "该用户在黑名单中", false));
        return e.approve(false);
    } else {
        if (tags.length === 0) {
            sendToAdmins(plugin, group_id, admins, constructMsg(e, "无(请尽快设置审批关键词)", true));
            // return e.approve(true);
            return;
        }
        const { passed, contain } = validateTag(tags, comment);
        if (passed) {
            sendToAdmins(plugin, group_id, admins, constructMsg(e, contain.join("、"), true));
            // return e.approve(true);
            return;
        } else {
            sendToAdmins(plugin, group_id, admins, constructMsg(e, "未检测到审批关键词", false));
            return e.approve(false);
        }
    }
};

// 将消息发给审批结果接收者
const sendToAdmins = (plugin: KiviPlugin, group_id: number, admins: number[], msg: string) => {
    const { bot } = plugin;
    try {
        const group = bot!.pickGroup(group_id, true);
        admins.forEach(uid => {
            const member = group.pickMember(uid);
            member.sendMsg(msg);
        });
    } catch (err) {
        plugin.throwPluginError(err as string);
    }
};
// 构造拒绝消息
const constructMsg = (e: GroupRequestEvent, reason: string, flag: boolean) => {
    const { group_id, group_name, user_id, nickname, comment } = e;
    const refuseMsg = `原因:${reason ?? "暂无"}`;
    const acceptMsg = `含有关键词:${reason}`;
    return `已${flag ? "同意" : "拒绝"}用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请
申请消息:${comment ?? "暂无"}
${flag ? acceptMsg : refuseMsg}`;
};
// 检测关键词并过滤出包含的关键词数组
const validateTag = (tags: string[], comment: string) => {
    let contain: string[] = [];
    let flag = false;
    tags.forEach(tag => {
        if (comment.indexOf(tag) !== -1) {
            flag = true;
            contain.push(tag);
        }
    });
    return { passed: flag, contain };
};
