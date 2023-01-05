import type { AllMessageEvent, Client, Group, GroupMessageEvent, KiviPlugin } from "@kivibot/core";
import type { GroupManagerConfig } from "../config";
export type GroupEventHandler = (
    e: GroupMessageEvent,
    plugin: KiviPlugin,
    config: GroupManagerConfig,
    // 指令后的参数消息
    argMsg: string,
    // 额外参数
    params?: any
) => void;

export type BotAdminCmdHandler = (
    e: AllMessageEvent,
    params: string[],
    plugin: KiviPlugin,
    config: GroupManagerConfig
) => void;
