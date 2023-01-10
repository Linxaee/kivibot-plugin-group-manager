import { ClustersConfig } from "../../../config";
import { GroupEventHandler } from "../../types";
/**
 * @description 添加新集群
 * @param label 集群标签
 * @param config 插件配置
 * @param plugin 插件实例
 */
export const removeClusterHandler: GroupEventHandler = (e, plugin, config, argMsg) => {
    /**
     * @argMsg 集群id
     */
    const ClusterID = argMsg.split(" ")[0];
    const groupsCluster = config.groupsCluster;
    // 看下集群是否在用
    const keys = Object.keys(groupsCluster[Number(ClusterID)].group);
    const groupLength = keys.length;

    if (groupLength > 0) {
        return e.reply(`集群不为空，无法删除`);
    } else {
        delete groupsCluster[Number(ClusterID)];
        plugin.saveConfig(config);
        return e.reply(`集群删除成功`);
    }
};
