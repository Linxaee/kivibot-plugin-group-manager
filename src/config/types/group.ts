import { ModuleName } from "../../map";
import { AccessConfig, TitleConfig, MuteConfig } from "../../module";
import { ModuleConfig } from "../config";

export interface GroupConfigs {
    [k: number]: GroupConfig;
}

// 普通群组配置
export interface GroupConfig {
    // 指令前缀
    cmdPrefix: string;
    // 启用的模块
    enableModules: ModuleName[];
    muteAllConfig: ModuleConfig;
    muteConfig: MuteConfig;
    adminConfig: ModuleConfig;
    titleConfig: TitleConfig;
    accessConfig: AccessConfig;
    removeConfig: ModuleConfig;
}
