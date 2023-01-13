import type {
  BotAdminCmdHandler,
  GroupEventHandler,
  commandInterceptor,
} from "../types";
import { addClusterHandler, removeClusterHandler, getMemberMap} from "./handler";
import { getGroupConfig } from "../../utils";
// cluster模块普通指令
export const clusterCommands: commandInterceptor = (e, config, cmd) => {
  const groupConfig = getGroupConfig(e, config);
  const map = new Map<string, GroupEventHandler>([
    [
      "刷新成员信息",
      (e, plugin, config, argMsg) => {
        getMemberMap(e as any, plugin, config, argMsg);
      },
    ]
  ]);

  // 若map中存在指令且没开启则回复
  if (!groupConfig.accessConfig.enableCluster && map.has(cmd))
    return e.reply(`本群尚未启用集群`) as any;
  return map;
};
// cluster模块管理员指令
export const clusterAdminCmd = new Map<string, BotAdminCmdHandler>([
  [
    "新增集群",
    (e, plugin, config, params) => {
      addClusterHandler(e as any, plugin, config, params.join(" "));
    },
  ],
  [
    "删除集群",
    (e, plugin, config, params) => {
      removeClusterHandler(e as any, plugin, config, params.join(" "));
    },
  ]
]);
