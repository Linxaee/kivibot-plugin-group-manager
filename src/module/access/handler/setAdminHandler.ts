import type { GroupEventHandler } from "../../../module/types";
import { getGroupFromCfg, handleAt, validateUid } from "../../../utils/index";
export const setAdminHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    const group = getGroupFromCfg(e, config);
    const setting = group?.accessConfig.setting;
    const curGroup = plugin.bot?.pickGroup(group!.gid);
    // uid
    let uid: number | string | undefined = undefined;
    // 判断是否开启at功能
    if (group?.accessConfig.enableAt) {
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
                if (!setting?.admins.includes(Number(uid))) {
                    setting?.admins.push(Number(uid));
                    plugin.saveConfig(config);
                    return e.reply(`已将 ${member!.card}(${uid}) 添加至本群分管`, true);
                } else return e.reply(`${member!.card}(${uid})已是本群分管`, true);
            } else {
                // 若是删除分管
                if (setting?.admins.includes(Number(uid))) {
                    const idx = setting?.admins.findIndex(admin => admin === Number(uid));
                    setting.admins.splice(idx, 1);
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
