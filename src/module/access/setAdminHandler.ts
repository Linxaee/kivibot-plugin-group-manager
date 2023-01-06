import type { GroupEventHandler } from "../types";
import { handleAt, validateUid } from "../../utils/index";
export const setAdminHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    const { accessGroup: groups, enableAt } = config.accessConfig;
    const gid = e.group_id;
    const curAccessGroup = groups.find(item => item.gid === gid);
    const curGroup = plugin.bot?.pickGroup(gid);
    // uid
    let uid: number | string | undefined = undefined;
    // 判断是否开启at功能
    if (enableAt) {
        uid = argMsg;
        // 若不合法则取用at解析出来的uid
        if (!validateUid(uid)) {
            uid = handleAt(e);
        }
    }
    if (validateUid(uid!)) {
        uid = Number(uid);
        try {
            const member = curGroup?.pickMember(Number(uid));
            // 若是添加分管
            if (params) {
                if (!curAccessGroup?.admins.includes(Number(uid))) {
                    curAccessGroup?.admins.push(Number(uid));
                    plugin.saveConfig(config);
                    return e.reply(`已将 ${member!.card}(${uid}) 添加至本群分管`, true);
                } else return e.reply(`${member!.card}(${uid})已是本群分管`, true);
            } else {
                // 若是删除分管
                if (curAccessGroup?.admins.includes(Number(uid))) {
                    const idx = curAccessGroup?.admins.findIndex(admin => admin === Number(uid));
                    curAccessGroup.admins.splice(idx, 1);
                    plugin.saveConfig(config);
                    return e.reply(`已取消 ${member!.card}(${uid}) 的本群分管`, true);
                } else return e.reply(`${member!.card}(${uid})尚未被设置为本群分管`, true);
            }
        } catch (err) {
            return e.reply(`本群不存在成员 ${uid}`);
        }
    } else {
        return e.reply("请输入正确的uid哦~", true);
    }
};
