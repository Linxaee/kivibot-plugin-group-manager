import type { AllMessageEvent, Client, Group, GroupMessageEvent, KiviPlugin } from "@kivibot/core";
import type { GroupManagerConfig } from "../config";
export type GroupEventHandler = (
	e: GroupMessageEvent,
	group: Group,
	plugin: KiviPlugin,
	bot: Client,
	config: GroupManagerConfig,
	params?: any
) => void;

export type BotAdminCmdHandler = (
	e: AllMessageEvent,
	params: string[],
	plugin: KiviPlugin,
	bot: Client,
	config: GroupManagerConfig
) => void;
