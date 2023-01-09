import type { AllMessageEvent, GroupMessageEvent, GroupRequestEvent, KiviPlugin } from "@kivibot/core";
import type { GroupManagerConfig } from "../config";
import { AccessSetting } from "./access";
// 群消息事件处理函数签名
export type GroupEventHandler = (
    e: GroupMessageEvent,
    plugin: KiviPlugin,
    config: GroupManagerConfig,
    // 指令后的参数消息
    argMsg: string,
    // 额外参数
    params?: any
) => void;

// bot管理员消息事件处理函数签名
export type BotAdminCmdHandler = (
    e: AllMessageEvent,
    plugin: KiviPlugin,
    config: GroupManagerConfig,
    params: string[],
    options?: any
) => void;

// 加群事件处理函数签名
export type AccessHandler = (
    plugin: KiviPlugin,
    e: GroupRequestEvent,
    config: GroupManagerConfig,
    group: AccessSetting
) => void;
// 集群开启状态下加群事件处理函数签名
export type ClusterAccessHandler = (plugin: KiviPlugin, e: GroupRequestEvent, config: GroupManagerConfig) => void;
// 指令拦截器函数签名,判断是否开启模块
export type commandInterceptor = (
    e: GroupMessageEvent,
    config: GroupManagerConfig,
    cmd: string
) => Map<string, GroupEventHandler>;
