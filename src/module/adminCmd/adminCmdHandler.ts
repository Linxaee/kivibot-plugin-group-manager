import type { GroupRole } from "@kivibot/core";
import type { BotAdminCmdHandler } from "../types";
import type { ModuleConfig } from "../../config";
import { roleList } from "../../config";
import { initHandler } from "../init";
export const adminCmdHandler: BotAdminCmdHandler = async (e, plugin, config, param) => {
    const [module, key, value] = param;

    // 开启插件
    if (module === "on") {
        if (e.message_type != "group") {
            return e.reply("请在群聊中使用此指令", true);
        }

        const gid = e.group_id;
        if (gid) {
            if (!config.enableGroups.includes(gid)) {
                config.enableGroups.push(gid);
                // 初始化，将各个模块的开启群聊列表加入当前群聊
                initHandler(plugin, config, gid);
                plugin.saveConfig(config);
            }
            return e.reply("本群已开启群管功能", true);
        }
    }
    // 关闭插件
    if (module === "off") {
        if (e.message_type != "group") {
            return e.reply("请在群聊中使用此指令", true);
        }

        const gid = e.group_id;
        if (gid) {
            if (config.enableGroups.includes(gid)) {
                const idx = config.enableGroups.findIndex(e => e === gid);
                config.enableGroups.splice(idx, 1);
                plugin.saveConfig(config);
            }
            return e.reply("本群已关闭群管功能", true);
        }
    }
    // 修改前缀
    if (module === "prefix") {
        config.cmdPrefix = key;
        plugin.saveConfig(config);
        return e.reply("已修改功能触发前缀", true);
    }

    // 开启模块
    if (module && key === "on") {
        if (e.message_type != "group") {
            return e.reply("请在群聊中使用此指令", true);
        }

        const gid = e.group_id;
        // 获取对应模块
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            if (gid) {
                if (!curModule.groups.includes(gid)) {
                    curModule.groups.push(gid);
                    plugin.saveConfig(config);
                }
                return e.reply(`本群已开启模块${curModule.name}`, true);
            }
        } else {
            return e.reply(`不存在模块${module},请检查输入`, true);
        }
    }

    // 关闭模块
    if (module && key === "off") {
        if (e.message_type != "group") {
            return e.reply("请在群聊中使用此指令", true);
        }
        const gid = e.group_id;
        // 获取对应模块
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            if (gid) {
                if (curModule.groups.includes(gid)) {
                    const idx = curModule.groups.findIndex(e => e === gid);
                    curModule.groups.splice(idx, 1);
                    plugin.saveConfig(config);
                }
                return e.reply(`本群已关闭模块${curModule.name}`, true);
            }
        } else {
            return e.reply(`不存在模块${module},请检查输入`, true);
        }
    }

    // 模块配置查看
    if (module && key === "dt") {
        // 获取对应模块的权限组
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            return e.reply(
                `${curModule.name}模块配置为:\n${JSON.stringify(
                    curModule,
                    null,
                    "\t"
                )}\n字段具体含义请自行查阅插件官网说明文档:\nhttps://github.com/Linxaee/kivibot-plugin-group-manager/blob/master/README.md`,
                true
            );
        } else {
            return e.reply(`不存在模块${module},请检查输入`, true);
        }
    }
    // 模块权限组查看
    if (module && key === "list") {
        // 获取对应模块的权限组
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            let msg = `${curModule.name}模块的权限组中有以下角色: `;
            curModule.permissionList.forEach((item, index) => {
                index === curModule.permissionList!.length - 1 ? (msg += item) : (msg += item + "/");
            });
            return e.reply(msg, true);
        } else {
            return e.reply(`不存在模块${module},请检查输入`, true);
        }
    }
    // 模块权限组添加
    if (module && key === "+" && value) {
        // 获取对应模块的权限组
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            // 检查value是否是合法角色
            if (!roleList.includes(value as any)) return e.reply(`不存在角色名${value},请检查输入`, true);
            // 检查权限组中是否已有该角色
            if (curModule.permissionList.includes(value as GroupRole))
                return e.reply(`${value}已存在于${curModule.name}模块的权限组`, true);
            else {
                // 权限组中添加该角色
                curModule.permissionList.push(value as GroupRole);
                plugin.saveConfig(config);
                return e.reply(`已将${value}添加至${curModule.name}模块的权限组`, true);
            }
        } else {
            return e.reply(`不存在模块${module},请检查输入`, true);
        }
    }
    // 模块权限组删除
    if (module && key === "-" && value) {
        // 获取对应模块的权限组
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            // 检查value是否是合法角色
            if (!roleList.includes(value as any)) return e.reply(`不存在角色名${value},请检查输入`, true);
            // 检查权限组中是否已有该角色
            if (!curModule.permissionList.includes(value as GroupRole))
                return e.reply(`${value}不存在于${curModule.name}模块的权限组中`, true);
            else {
                // 权限组中删除该角色
                const idx = curModule.permissionList.findIndex(item => item === value);
                curModule.permissionList.splice(idx, 1);
                plugin.saveConfig(config);
                return e.reply(`已将${value}从${curModule.name}模块的权限组中移除`, true);
            }
        } else {
            return e.reply(`不存在模块${module},请检查输入`, true);
        }
    }

    // 启用at功能
    if (module && key === "at" && value) {
        // 获取对应模块
        let curModule = (config as any)[`${module}Config`] as ModuleConfig;
        if (curModule) {
            // 检查当前模块是否有at功能
            if (typeof curModule.enableAt === "undefined") return e.reply(`${curModule.name}模块没有at功能哦~`, true);
            // 检查value是否是合法参数
            if (!["on", "off"].includes(value)) return e.reply(`参数错误`, true);
            // 检查权限组中是否已有该角色
            if (value == "on") {
                curModule.enableAt = true;
            } else {
                curModule.enableAt = false;
            }
            plugin.saveConfig(config);
            return e.reply(`已${value === "on" ? "开启" : "关闭"}${curModule.name}模块的at功能`, true);
        } else {
            return e.reply(`不存在模块 ${module},请检查输入`, true);
        }
    }
};
