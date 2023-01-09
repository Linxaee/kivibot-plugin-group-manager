import { KiviPlugin, segment, makeForwardMsg, GroupMessageEvent } from "@kivibot/core";
import { config } from "./config";
import { commandMap, adminCmdMap } from "./map";
import { adminCmdHandler } from "./module/adminCmd";
import { accessHandler } from "./module/access";
import { clusterHandler } from "./module/cluster";
import { deepMerge, getGroupConfig, validateConfigVersion } from "./utils";
//@ts-ignore
const { version } = require("../package.json");

const plugin = new KiviPlugin("group-manager", version);
plugin.onMounted(bot => {
    // 检查配置版本是否小于1.3.5
    validateConfigVersion(plugin, config);
    plugin.saveConfig(deepMerge(config, plugin.loadConfig()));

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
