# 群管插件 for KiviBot (开发中)

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-group-manager?color=527dec&label=kivibot-plugin-group-manager&style=flat-square)](https://npm.im/kivibot-plugin-group-manager)
[![dm](https://shields.io/npm/dm/kivibot-plugin-group-manager?style=flat-square)](https://npm.im/kivibot-plugin-group-manager)

[`KiviBot`](https://beta.kivibot.com) 的 qq 群聊管理插件，提供了一系列群聊管理功能。

**安装**

```shell
/plugin add group-manager
```

**启用**

```shell
/plugin on group-manager
```

**使用**

**bot 管理员**可以通过前缀为`/gmc`的一系列指令对**单个模块**进行配置

```shell
1. /gmc <on/off> : 在群聊中(开启/关闭)群管插件
2. /gmc prefix <前缀> : 修改功能的触发前缀
3. /gmc <模块名> list : 查看模块的权限组
4. /gmc <模块名> + <角色> : 将角色添加到模块的权限组
5. /gmc <模块名> - <角色> 将角色从模块的权限组中移除
6. /gmc <模块名> at <on/off> (开启/关闭)模块的at功能
当前模块有:
1. muteAll 全员禁言
2. admin 设置管理员
3. title 设置头衔
当前角色有:
1. owner 群主
2. admin 管理员
3. member 群员
```

具体功能可以通过前缀为`/(默认,可修改)`的一系列指令使用本插件

```shell
muteAll模块(不具有at功能):
1. /all : 开启全员禁言
2. /deall : 关闭全员禁言

admin模块：
1. /管理+ <qq号/@某人> : 将目标设置为群管理员
2. /管理- <qq号/@某人> : 取消目标的群管理员

title模块:
1. /头衔 <qq号/@某人> <头衔/空> : 设置目标头衔，若未填入头衔或置空则清空目标头衔
```

**默认配置**

1. 插件配置

```typescript
//对于插件整体，有如下默认配置
pluginConfig: {
    // 默认启用群聊为空，bot管理员执行/gmc on在群内启用群管插件
    enableGroups: [],
    // 默认功能的触发前缀为 / ,可通过/gmc prefix <前缀>自行修改
    cmdPrefix: "/",
},
```

2. 模块配置

```typescript
//对于单个模块，插件有如下默认配置
moduleConfig: {
    // 模块默认权限集为群主、管理员,即群主和管理员可以使用本模块功能
    permissionList: ["owner","admin"],
    // 默认开启at功能（若模块具有at功能）
    enableAt: true,
},
```

**TODO**

1. [x] ~~全员禁言及解除~~
2. [x] ~~设置/取消管理~~
3. [x] ~~设置头衔~~
4. [x] ~~自定义前缀~~
5. [ ] 允许/禁止匿名
6. [ ] 精华消息
7. [ ] 单独禁言
8. [ ] 改名片
9. [ ] 踢出
10. [ ] 撤回
11. [ ] help

#### 更新日志

-   1.1.0

    -   支持自定义前缀 (默认`/`)
    -   简化指令
        1. 原 bot 管理员指令前缀`/gmconfig` 变更为 `/gmc`
        2. 权限组操作变为 `+` `-`
        3. 删除原功能触发前缀`/gm`，部分指令变为简单中文词

-   1.0.0
    -   支持 全员禁言、设置取消管理、设置头衔

