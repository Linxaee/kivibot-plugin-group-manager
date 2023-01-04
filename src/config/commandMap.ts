import type { GroupEventHandler } from "../handler/types";
import { muteAllHandler } from "../handler/muteAllHandler";
import { adminHandler } from "../handler/adminHandler";
import { titleHandler } from "../handler/titleHandler";

export const commandMap = new Map<string, GroupEventHandler>([
	[
		"muteall",
		(e, group, bot, plugin, config) => {
			muteAllHandler(e, group, bot, plugin, config, true);
		},
	],
	[
		"demuteall",
		(e, group, bot, plugin, config) => {
			muteAllHandler(e, group, bot, plugin, config, false);
		},
	],
	[
		"setadmin",
		(e, group, bot, plugin, config) => {
			adminHandler(e, group, bot, plugin, config, true);
		},
	],
	[
		"deadmin",
		(e, group, bot, plugin, config) => {
			adminHandler(e, group, bot, plugin, config, false);
		},
	],
	["settitle", titleHandler],
]);
