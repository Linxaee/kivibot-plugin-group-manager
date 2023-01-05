import type { GroupEventHandler } from "../module";
import { muteAllCommands, muteCommands, adminCommands, titleCommands } from "../module";
export const commandMap = new Map<string, GroupEventHandler>([
    ...muteAllCommands,
    ...muteCommands,
    ...adminCommands,
    ...titleCommands,
]);
