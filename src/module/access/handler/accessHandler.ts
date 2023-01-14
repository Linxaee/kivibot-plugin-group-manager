import type { AccessHandler } from "../../types";
import { GroupRequestEvent, KiviPlugin } from "@kivibot/core";
import { getGroupConfig } from "../../../utils/utils";
import { formatSeconds } from "../../../utils";
export const accessHandler: AccessHandler = async (plugin, e, config, group) => {
    const { globalBlackList } = config;
    const { tempBlackList } = getGroupConfig(e, config).accessConfig;
    // 获取uid,gid,申请消息
    const { user_id, group_id, group_name, comment, nickname } = e;
    // 获取黑名单,分管员,审批关键词
    const { blackList, admins, tags, refuseMsg } = group;
    // 若申请人在黑名单中
    if (globalBlackList.includes(user_id)) {
        const user = plugin.bot?.pickUser(user_id);
        const flag = await user?.setGroupReq(group_id, e.seq, false, refuseMsg, true);
        if (flag)
            // 拒绝并发送消息
            return sendToAdmins(plugin, group_id, admins, constructMsg(e, "该用户在全局黑名单中", false));
        else
            return sendToAdmins(
                plugin,
                group_id,
                admins,
                `由于未知原因,无法处理用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请，请自行审批`
            );
    }

    if (blackList.includes(user_id)) {
        const user = plugin.bot?.pickUser(user_id);
        const flag = await user?.setGroupReq(group_id, e.seq, false, refuseMsg, true);
        if (flag)
            // 拒绝并发送消息
            return sendToAdmins(plugin, group_id, admins, constructMsg(e, "该用户在本群黑名单中", false));
        else
            return sendToAdmins(
                plugin,
                group_id,
                admins,
                `由于未知原因,无法处理用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请，请自行审批`
            );
    } else {
        // 若申请人在临时黑名单中
        if (tempBlackList[user_id]) {
            // 判断是否已到期
            const temp = tempBlackList[user_id];
            const interval = temp.duration * 60 * 60 - (Date.now() - temp.lastRecordTime) / 1000;
            // 若>=0说明还未到期
            if (interval >= 0) {
                const user = plugin.bot?.pickUser(user_id);
                const flag = await user?.setGroupReq(
                    group_id,
                    e.seq,
                    false,
                    `加群冷却中,请${formatSeconds(Number(Math.floor(interval).toFixed(0)))}后再尝试`
                );
                if (flag)
                    // 拒绝并发送消息
                    return sendToAdmins(
                        plugin,
                        group_id,
                        admins,
                        constructMsg(
                            e,
                            `该用户在临时黑名单中,还有${formatSeconds(Number(Math.floor(interval).toFixed(0)))}才解禁`,
                            false
                        )
                    );
                else
                    return sendToAdmins(
                        plugin,
                        group_id,
                        admins,
                        `由于未知原因,无法处理用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请，请自行审批`
                    );
            }
        } else {
            if (tags.length === 0) {
                const flag = await e.approve(true);
                if (flag)
                    // 同意并发送消息
                    return sendToAdmins(plugin, group_id, admins, constructMsg(e, "无(请尽快设置审批关键词)", true));
                else
                    return sendToAdmins(
                        plugin,
                        group_id,
                        admins,
                        `由于未知原因,无法处理用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请，请自行审批`
                    );
            }
            const { passed, contain } = validateTag(tags, comment);
            if (passed) {
                const flag = await e.approve(true);
                if (flag)
                    // 同意并发送消息
                    return sendToAdmins(plugin, group_id, admins, constructMsg(e, contain.join("、"), true));
                else
                    return sendToAdmins(
                        plugin,
                        group_id,
                        admins,
                        `由于未知原因,无法处理用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请，请自行审批`
                    );
            } else {
                const user = plugin.bot?.pickUser(user_id);
                const flag = await user?.setGroupReq(group_id, e.seq, false, `请正确回答入群问题`);
                if (flag)
                    // 拒绝并发送消息
                    return sendToAdmins(plugin, group_id, admins, constructMsg(e, "未检测到审批关键词", false));
                else
                    return sendToAdmins(
                        plugin,
                        group_id,
                        admins,
                        `由于未知原因,无法处理用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请，请自行审批`
                    );
            }
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
    let baseMsg = `已${flag ? "同意" : "拒绝"}用户 ${nickname}(${user_id}) 的入群 ${group_name}(${group_id}) 的申请`;
    const refuseMsg = `原因: ${reason ?? "暂无"}`;
    const acceptMsg = `含有关键词: ${reason}`;
    // 匹配comment是否包含问题
    const pattern = /问题：(.*)\n答案：(.*)/;
    const match = comment.match(pattern);
    // 若匹配到了问题
    if (match) {
        const question = match[1];
        const answer = match[2];
        baseMsg += `
入群问题: ${question}
回答: ${answer}
${flag ? acceptMsg : refuseMsg}
`;
    } else {
        // 没匹配到按照普通申请信息处理
        baseMsg += `
申请消息: ${comment ?? "暂无"}
${flag ? acceptMsg : refuseMsg}`;
    }

    return baseMsg;
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
