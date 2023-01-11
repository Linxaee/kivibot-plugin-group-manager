export interface VersionDetails {
    [k: string]: string[];
}
export const versionDetails: VersionDetails = {
    "1.3.7": [
        "修改指令 /gmc <qq号/@某人> 功能为 禁言目标默认时长(1h,可配置)",
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
