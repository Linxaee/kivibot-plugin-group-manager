import { KiviPlugin, segment, makeForwardMsg, GroupMessageEvent } from "@kivibot/core";
import { config } from "./config";
import { commandMap, adminCmdMap } from "./map";
import { adminCmdHandler } from "./module/adminCmd";
import { accessHandler } from "./module/access";
import { deepMerge, getGroupFromCfg, validateConfigVersion } from "./utils";
//@ts-ignore
const { version } = require("../package.json");

const plugin = new KiviPlugin("group-manager", version);
plugin.onMounted(bot => {
    // 检查配置版本
    validateConfigVersion(version, plugin, config);
    plugin.saveConfig(deepMerge(config, plugin.loadConfig()));
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
        console.log(cmd);

        if (!adminCmdMap.has(cmd!)) return;
        const handler = adminCmdMap.get(cmd!);
        handler!(e, plugin, config, argMsg.split(" "));
    });
    // 处理群聊消息;
    plugin.onGroupMessage(e => {
        // 过滤未开启的群聊
        if (!config.enableGroups.includes(e.group_id)) {
            return;
        }
        const { raw_message } = e;
        const group = getGroupFromCfg(e, config);

        // 匹配指令前缀、指令
        const prefix = group!.cmdPrefix;
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
        // 从配置了自动审批的群聊中查找群聊对象
        const group = getGroupFromCfg(e, config);
        // 若未找到该群聊则不做处理
        if (!group) return;
        // 找到该群聊则交由handler处理
        accessHandler(plugin, e, config, group.accessConfig.setting);
    });
});

export { plugin };
