import { ModuleName } from "../../map";
import { AccessConfig } from "../../module";
import { TitleConfig } from "../../module/title";
import { ModuleConfig } from "../config";

// 集群配置
export interface ClustersConfig {
    // 群组内允许用户最多加几个群
    max: number;
    // 群组所属领域
    label: string;
    group: Map<number, ClusterGroupConfig>;
}

// 集群群组配置
export interface ClusterGroupConfig {
    // 是否遵守群上限规则
    complianceLimit: boolean;
    // 所属集群id
    group: number;
    // 群上限
    limit: number;
    // 因上线被拒时引导加群群号
    guide: number;
    // 指令前缀
    cmdPrefix: string;
    // 启用的模块
    enableModules: ModuleName[];
    muteAllConfig: ModuleConfig;
    muteConfig: ModuleConfig;
    adminConfig: ModuleConfig;
    titleConfig: TitleConfig;
    accessConfig: AccessConfig;
}
// 应用目标集群
export interface TargetClusters {
    // 应用的集群
    group: number[];
}

export interface GroupsCluster {
    [k: number]: ClustersConfig;
}
export interface ClusterList {
    [k: number]: TargetClusters;
}
