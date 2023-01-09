import { AccessConfig } from "../../module";

// 集群配置
export interface ClustersConfig {
    // 群组所属领域
    label: string;
    // 应用该集群的群组
    group: GroupList;
    // 集群黑名单
    blackList: number[];
    // 集群白名单
    specialList: number[];
}

// 集群群组配置
export interface ClusterGroupConfig {
    // 单独对每个群进行配置集群内最高的加群数量
    max: number;
    // 所属集群id
    group: number;
    // 群人数上限
    limit: number;
    // 因上限被拒时引导加群群号
    guide: number;
    accessConfig: AccessConfig;
}
// 应用目标集群

export interface GroupsCluster {
    [k: number]: ClustersConfig;
}
export interface GroupList {
    [k: number]: ClusterGroupConfig;
}
