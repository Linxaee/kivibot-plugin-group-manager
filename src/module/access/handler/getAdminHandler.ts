import type { GroupEventHandler } from "@/module/types";
export const getAdminHandler: GroupEventHandler = (e, plugin, config, argMsg, params) => {
    const { accessGroup: groups } = config.accessConfig;
    // 若查看本群分管
    if (!params) {
        const gid = e.group_id;
        const curAccessGroup = groups.find(item => item.gid === gid);
        const curGroup = plugin.bot?.pickGroup(gid);
        const admins = curAccessGroup?.admins;
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
        const groups = config.accessConfig.accessGroup;
        groups.forEach((item, index) => {
            const group = plugin.bot?.pickGroup(item.gid);
            let adminMsg = "";
            item.admins.forEach((admin, index) => {
                const member = group?.pickMember(admin);
                adminMsg +=
                    index === item.admins.length - 1 ? `${member?.card}(${admin})` : `${member?.card}(${admin})\n`;
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
