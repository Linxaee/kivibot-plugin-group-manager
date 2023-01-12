import { ClustersConfig } from "../../../config";
import { GroupEventHandler } from "../../types";
/**
 * @description 添加新集群
 * @param label 集群标签
 * @param config 插件配置
 * @param plugin 插件实例
 */
export const addClusterHandler: GroupEventHandler = (e, plugin, config, argMsg) => {
    /**
     * @todo 验证label是否重复
     */
    const label = argMsg.split(" ")[0];
    const groupCluster = config.groupCluster;
    // 获取此项键值应为多少
    const keys = Object.keys(groupCluster);
    const nextKey = keys.length === 0 ? 1 : keys.length + 1;

    // 验证label是否重复
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const cluster = groupCluster[Number(key)];
        if (cluster.label === label) return e.reply(`集群${label}已存在，请勿重复添加`);
    }
    
    // 构造新集群初始化对象
    const newCluster: ClustersConfig = {
        label,
        group: {},
        blackList: [],
        specialList: []
    };
    groupCluster[nextKey] = newCluster;
    plugin.saveConfig(config);
    return e.reply(`集群${label}添加成功`);
};
