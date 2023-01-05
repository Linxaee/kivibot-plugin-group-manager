import type { AllMessageEvent, Client, Group, GroupMessageEvent, KiviPlugin } from "@kivibot/core";
import type { GroupManagerConfig } from "../config";
export type GroupEventHandler = (
    e: GroupMessageEvent,
    plugin: KiviPlugin,
    config: GroupManagerConfig,
    argMsg: string,
    params?: any
) => void;

export type BotAdminCmdHandler = (
    e: AllMessageEvent,
    params: string[],
    plugin: KiviPlugin,
    config: GroupManagerConfig
) => void;
