import { ModuleName } from "../../map";
import { AccessConfig, TitleConfig, MuteConfig, RemoveConfig } from "../../module";
import { ModuleConfig } from "../config";

export interface GroupConfigs {
    [k: number]: GroupConfig;
}

// 普通群组配置
export interface GroupConfig {
    // 指令前缀
    cmdPrefix: string;
    // 本群是否开启了版本更新内容提示
    isEnableNewVer: boolean;
    // 启用的模块
    enableModules: ModuleName[];
    muteAllConfig: ModuleConfig;
    muteConfig: MuteConfig;
    adminConfig: ModuleConfig;
    titleConfig: TitleConfig;
    accessConfig: AccessConfig;
    removeConfig: RemoveConfig;
}
