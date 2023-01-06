import type { BotAdminCmdHandler, GroupEventHandler, commandInterceptor } from "../module";
import { accessAdminCmd } from "../module";

export const adminCmdMap = new Map<string, BotAdminCmdHandler>([...accessAdminCmd]);
