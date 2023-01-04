import { KiviPlugin, segment, makeForwardMsg, GroupMessageEvent } from "@kivibot/core";
import { config, commandMap } from "./config";
import { adminCmdHandler } from "./handler/adminCmdHandler";

const { version } = require("../package.json");

const plugin = new KiviPlugin("group-manager", version);

plugin.onMounted(bot => {
	plugin.saveConfig(Object.assign(config, plugin.loadConfig()));
	// 处理bot管理员配置消息
	plugin.onAdminCmd("/gmconfig", (e, params) => {
		adminCmdHandler(e, params, plugin, bot, config);
	});

	// 处理群聊消息
	plugin.onGroupMessage((e, params) => {

		// 过滤未开启的群聊
		if (!config.enableGroups.includes(e.group_id)) {
			return;
		}
		const { raw_message } = e;

		// 匹配指令前缀、指令
		const [prefix, cmd] = raw_message.split(" ");
		// 前缀不为/gm则不做处理
		if (prefix !== "/gm") return;
		// commandMap中未找到则不做处理
		if (!commandMap.has(cmd)) return e.reply("暂时没有该指令哦~");

		// 获取群聊对象实例
		const gid = e.group_id;
		const group = bot.pickGroup(gid);

		// 执行cmd对应的handler
		const handler = commandMap.get(cmd);
		handler!(e, group, plugin, bot, config);
	});
});

export { plugin };
