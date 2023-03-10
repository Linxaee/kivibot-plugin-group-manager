import type { BotAdminCmdHandler } from "../module";
import { accessAdminCmd, clusterAdminCmd } from "../module";
// bot管理员全局指令
export const adminCmdMap = new Map<string, BotAdminCmdHandler>([...accessAdminCmd, ...clusterAdminCmd]);
