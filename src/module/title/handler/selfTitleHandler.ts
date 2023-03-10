import type { GroupEventHandler } from "../../../module/types";
import { selfNoAuthMsg, roleAuth, validateTitle, getGroupConfig } from "../../../utils";
export const selfTitleHandler: GroupEventHandler = async (e, plugin, config, argMsg, params) => {
    // 消息发送人的uid
    const sender_id = e.sender.user_id;
    // 获取群对象
    const group = e.group;
    const groupConfig = getGroupConfig(e, config);
    // 是否开启自行申请
    const { enableSelf } = groupConfig!.titleConfig;
    // bot若不是管理或群主则发送
    if (!roleAuth.selfIsGroupOwner(group)) return e.reply(selfNoAuthMsg + "设置头衔需将bot设置为群主哦");
    // 判断是否开启自己申请
    if (!enableSelf) return e.reply("本群尚未开启自行申请头衔功能,可以联系bot管理员开启该功能", true);
    else {
        // 头衔
        const title = argMsg.split(" ")[0];
        if (!validateTitle(title)) return e.reply(`头衔大于12个字符,请重新设置`);
        if (!title) {
            group.setTitle(sender_id);
            return e.reply(`已清空您的头衔`, true);
        }
        group.setTitle(sender_id, title);
        return e.reply(`已将您的头衔设置为 ${title}`, true);
    }
};
