import type { GroupEventHandler, commandInterceptor } from "../module";

import {
    muteAllCommands,
    muteCommands,
    adminCommands,
    titleCommands,
    accessCommands,
    removeCommands,
    clusterCommands,
} from "../module";
// 普通指令
export const commandMap: commandInterceptor = (e, config, cmd) =>
    new Map<string, GroupEventHandler>([
        ...muteAllCommands(e, config, cmd),
        ...muteCommands(e, config, cmd),
        ...adminCommands(e, config, cmd),
        ...titleCommands(e, config, cmd),
        ...accessCommands(e, config, cmd),
        ...removeCommands(e, config, cmd),
        ...clusterCommands(e, config, cmd),
    ]);
