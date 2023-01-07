import type { GroupEventHandler } from "../../../module/types";
import { getGroupFromCfg } from "../../../utils";
export const getAdminHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    // 若查看本群分管
    if (!params) {
        const group = getGroupFromCfg(e, config);
        const setting = group?.accessConfig.setting;
        const gid = e.group_id;
        const curGroup = plugin.bot?.pickGroup(gid);
        const admins = setting!.admins;
        if (admins?.length === 0) return e.reply("本群尚未设置分管", true);
        let msg = `本群当前分管有:\n`;
        admins?.forEach((admin, index) => {
            const member = curGroup?.pickMember(admin);
            msg +=
                index === admins.length - 1
                    ? `${index + 1}.${member?.card}(${admin})`
                    : `${index + 1}.${member?.card}(${admin})\n`;
        });
        return e.reply(msg, true);
    } else {
        // 若查看所有分管
        let baseMsg = "该bot所在的所有开启群管功能的群聊有如下分管:\n";
        const groups = config.groupConfigs;
        groups.forEach((item, index) => {
            const group = plugin.bot?.pickGroup(item.gid);
            let adminMsg = "";
            item.accessConfig.setting.admins.forEach((admin, index) => {
                const member = group?.pickMember(admin);
                adminMsg +=
                    index === item.accessConfig.setting.admins.length - 1
                        ? `${member?.card}(${admin})`
                        : `${member?.card}(${admin})\n`;
            });
            let msg =
                index === groups.length - 1
                    ? `${index + 1}.${group?.name}(${group?.gid}):\n${adminMsg}`
                    : `${index + 1}.${group?.name}(${group?.gid}):\n${adminMsg}\n`;
            baseMsg += msg;
        });
        return e.reply(baseMsg, true);
    }
};
