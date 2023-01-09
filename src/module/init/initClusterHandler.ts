import type { ClusterGroupConfig, GroupManagerConfig } from "../../config";
import type { KiviPlugin } from "@kivibot/core";
import { getGroupConfig } from "../../utils/utils";

/**
 * @description 当群组第一次启用集群时初始化该群集群配置
 * @param plugin 插件实例
 * @param config 插件配置
 * @param gid 群id
 * @param cid 集群id
 */
export const initClusterHandler = (plugin: KiviPlugin, config: GroupManagerConfig, gid: number, cid: number) => {
    const clusterConfig = config.groupsCluster[cid];
    const GroupConfig = getGroupConfig(gid, config);
    // 若不存在则存入
    if (clusterConfig && !clusterConfig.group[gid]) {
        // 开启普通access模块下的enableCluster，以拦截access模块指令的使用
        GroupConfig.accessConfig.enableCluster = true;
        // 构造群初始化集群配置
        const newGroup: ClusterGroupConfig = {
            max: 999,
            group: 1,
            limit: 500,
            guide: 7777,
            accessConfig: GroupConfig.accessConfig,
        };
        clusterConfig.group[gid] = newGroup;
    }
    plugin.saveConfig(config);
};
