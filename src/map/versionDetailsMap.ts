export interface VersionDetails {
    [k: string]: string[];
}
export const versionDetails: VersionDetails = {
    "1.4.2": ["access模块基本指令支持私聊"],
    "1.4.1": ["bot管理员指令支持私聊并指定群号", "所有词条/分管/黑名单 指令支持私聊", "修复部分模块权限错误"],
    "1.4.0": ["新增自定义默认群黑名单拒绝理由", "新增因关键词、临时拉黑被拒绝入群时的拒绝理由"],
    "1.3.9": ["将更新消息限制到仅管理员"],
    "1.3.8": [
        "修改指令 /踢 <qq号/@某人> 为 /踢 <qq号/@某人> <时间(h)/永久>",
        "修改指令 /默认时间 <时长(分钟为单位)> 为 /默认禁言 <时长(分钟为单位)>",
        "禁言的默认时长修改为以分钟为单位"
    ],
    "1.3.7": [
        "修改指令 /禁 <qq号/@某人> 功能为 禁言目标默认时长(1h,可配置)",
        "将随机禁言指令更改为 /禁 <qq号/@某人> <r/R/随>"
    ],
    "1.3.6": ["新增踢出功能", "future: 集群管理"],
    "1.3.5": ["新增黑名单功能", "新增分群功能", "修复启动插件覆盖原先配置的 bug"],
    "1.3.2": ["修复入群申请不审批的bug"],
    "1.3.1": ["修复因浅拷贝导致的配置合并失败的bug"],
    "1.3.0": ["新增自动审批及附属功能", "新增模块开关"],
    "1.2.2": ["新增申请头衔功能"],
    "1.2.0": ["新增单独禁言模块"],
    "1.1.0": ["支持自定义前缀(默认/)", "简化指令"]
};
