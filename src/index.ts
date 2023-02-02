import { KiviPlugin, segment, makeForwardMsg, GroupMessageEvent } from "@kivibot/core";
import { config } from "./config";
import { commandMap, adminCmdMap } from "./map";
import { adminCmdHandler } from "./module/adminCmd";
import { accessHandler, rawMap, accessCommands, accessConfig } from "./module/access";
import { clusterHandler } from "./module/cluster";
import { getGroupConfig, getModuleCnName, getModuleEnable, roleAuth, validatePluginConfig } from "./utils";
import { validateNumber } from "./utils/validate";
//@ts-ignore
const { version } = require("../package.json");

const plugin = new KiviPlugin("group-manager", version);
plugin.onMounted(bot => {
    validatePluginConfig(version, plugin, config);
    // 在命令前加上 /
    const botAdminGlobalCmd = Array.from(adminCmdMap.keys()).map(cmd => "/" + cmd);
    // 处理bot管理员配置指令
    plugin.onAdminCmd("/gmc", (e, params) => {
        adminCmdHandler(e, plugin, config, params);
    });
    // 处理bot管理员全局指令
    plugin.onAdminCmd(botAdminGlobalCmd, (e, params) => {
        const { raw_message } = e;
        const temp = raw_message.slice(1).split(" ");
        const [cmd, argMsg] = [temp.shift(), temp.join(" ")];

        if (!adminCmdMap.has(cmd!)) return;

        const handler = adminCmdMap.get(cmd!);
        handler!(e, plugin, config, argMsg.split(" "));
    });
    // 处理群组消息;
    plugin.onGroupMessage(e => {
        // 过滤未开启的群组
        if (!config.enableGroups.includes(e.group_id)) {
            return;
        }
        const { raw_message } = e;
        const groupConfig = getGroupConfig(e, config);
        // 匹配指令前缀、指令
        const prefix = groupConfig!.cmdPrefix;
        const passed = raw_message.trim().startsWith(prefix);
        // 前缀不为定义的前缀则不做处理
        if (!passed) return;

        // commandMap中未找到则不做处理
        const temp = raw_message.slice(1).split(" ");
        // 分割指令和之后的参数
        const [cmd, argMsg] = [temp.shift(), temp.join(" ")];
        const map = commandMap(e, config, cmd!);

        if (!map.has(cmd!)) return;
        // 执行cmd对应的handler
        const handler = map.get(cmd!);
        handler!(e, plugin, config, argMsg);
    });
    // access专属
    plugin.onPrivateMessage(e => {
        const { raw_message } = e;
        // 匹配指令前缀、指令
        const passed = raw_message.trim().startsWith("/");
        // 前缀不为定义的前缀则不做处理
        if (!passed) return;
        const temp = raw_message.slice(1).split(" ");
        const [cmd, argMsg] = [temp.shift(), temp.join(" ")];
        if (!rawMap.has(cmd!)) return;

        let gid: string | undefined | number = argMsg.split(" ").pop();
        if (gid && !validateNumber(gid)) e.reply("请输入正确群号");
        gid = Number(gid);
        if (!roleAuth.senderIsBotAdmin(plugin, e.sender.user_id)) return e.reply(`私聊配置仅支持bot管理员使用`);
        // 过滤未开启的群组
        if (!config.enableGroups.includes(gid)) {
            return e.reply(`群聊 ${gid} 尚未启用群管插件`);
        }
        const groupConfig = getGroupConfig(gid, config);
        if (!getModuleEnable(groupConfig!, "access"))
            return e.reply(`本群尚未启用${getModuleCnName(accessConfig)}模块`) as any;

        const handler = rawMap.get(cmd!);
        (e as any).group_id = gid;
        (e as any).group = bot.pickGroup(gid);
        (e as any).member = null;
        (e as any).recall = null;
        handler!(e as unknown as GroupMessageEvent, plugin, config, argMsg);
    });
    // 处理加群申请
    plugin.on("request.group.add", e => {
        // 从配置了自动审批的群组中查找群组对象
        const groupConfig = getGroupConfig(e, config);
        // 若未找到该群组则不做处理
        if (!groupConfig) return;
        // 找到该群组则交由handler处理
        if (groupConfig.accessConfig.enableCluster) clusterHandler(plugin, e, config);
        else accessHandler(plugin, e, config, groupConfig.accessConfig.setting);
    });
});

export { plugin };
