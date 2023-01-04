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

**bot 管理员**可以通过前缀为`/gmconfig`的一系列指令对**单个模块**进行配置

```shell
1. /gmconfig <on/off> 在群聊中(开启/关闭)群管插件
2. /gmconfig <模块名> listp 查看模块的权限组
3. /gmconfig <模块名> addp <角色> 将角色添加到模块的权限组
4. /gmconfig <模块名> removep <角色> 将角色从模块的权限组中移除
5. /gmconfig <模块名> at <on/off> (开启/关闭)模块的at功能
当前模块有:
1. mute 全员禁言
2. admin 设置管理员
3. title 设置头衔
当前角色有:
1. owner 群主
2. admin 管理员
3. member 群员
```

具体功能可以通过前缀为`/gm`的一系列指令使用本插件

```shell
mute模块(不具有at功能):
1. /gm muteall 开启全员禁言
2. /gm demuteall 关闭全员禁言

admin模块：
1. /gm setadmin <qq号/@某人> 将目标设置为群管理员
2. /gm deadmin <qq号/@某人> 取消目标的群管理员

title模块:
1. /gm settitle <qq号/@某人> <头衔/空> 设置目标头衔，若未填入头衔或置空则清空目标头衔
```

**默认配置**

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
4. [ ] 允许/禁止匿名
5. [ ] 精华消息
6. [ ] 单独禁言
7. [ ] 改名片
8. [ ] 踢出
9. [ ] 撤回
10. [ ] help

