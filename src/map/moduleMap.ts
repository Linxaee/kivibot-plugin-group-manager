export const moduleMap = {
    muteAll: "全员禁言",
    mute: "单独禁言",
    admin: "设置管理员",
    title: "设置头衔",
    access: "自动审批",
};

export const moduleKeyMap = {
    true: "是",
    false: "否",
    enableGroups: "启用群组",
    gid: "群号",
    cmdPrefix: "指令前缀",
    enableModules: "启用模块",
    enable: "是否启用",
    At: "at功能",
    Self: "自行申请",
    name: "模块名",
    permissionList: "权限组",
    setting: "配置",
    admins: "分管",
    tags: "审批词",
    blackList: "黑名单",
    muteAllConfig: "全员禁言模块(muteAll)",
    muteConfig: "单独禁言模块(mute)",
    adminConfig: "设置管理员模块(admin)",
    titleConfig: "设置头衔模块(title)",
    accessConfig: "自动审批模块(access)",
};
/**
 * @description 将转入的字符串中关键字替换
 * @param str 待转化字符串
 * @returns 替换关键词后的字符串
 */
export const transformModuleKey = (str: string): string => {
    let transformed = str;
    Object.keys(moduleKeyMap).forEach((key: string) => {
        const value = moduleKeyMap[key as keyof typeof moduleKeyMap];
        transformed = transformed.split(key).join(value);
    });
    return transformed;
};
export type ModuleName = keyof typeof moduleMap;
