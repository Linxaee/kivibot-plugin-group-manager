import { KiviPlugin, segment, makeForwardMsg, GroupMessageEvent } from "@kivibot/core";
import { config, commandMap } from "./config";
import { adminCmdHandler } from "./handler/adminCmdHandler";
//@ts-ignore
const { version } = require("../package.json");

const plugin = new KiviPlugin("group-manager", version);

plugin.onMounted(bot => {
    plugin.saveConfig(Object.assign(config, plugin.loadConfig()));
    // 处理bot管理员配置消息
    plugin.onAdminCmd("/gmc", (e, params) => {
        adminCmdHandler(e, params, plugin, config);
    });

    // 处理群聊消息;
    plugin.onGroupMessage((e, params) => {
        // 过滤未开启的群聊
        if (!config.enableGroups.includes(e.group_id)) {
            return;
        }
        const { raw_message } = e;

        // 匹配指令前缀、指令
        const prefix = config.cmdPrefix;
        const passed = raw_message.trim().startsWith(prefix);
        // 前缀不为定义的前缀则不做处理
        if (!passed) return;

        // commandMap中未找到则不做处理
        const temp = raw_message.slice(1).split(" ");
        // 分割指令和之后的参数
        const [cmd, argMsg] = [temp.shift(), temp.join(" ")];
        if (!commandMap.has(cmd!)) return;

        // 执行cmd对应的handler
        const handler = commandMap.get(cmd!);
        handler!(e, plugin, config, argMsg);
    });
});

export { plugin };
