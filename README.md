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

## 使用

**Tips:**

-   使用`plugin on `启用插件后，需在**群内**内使用`/gmc on`将群聊加入插件的使用列表才能正常使用功能
-   关于指令，**bot 管理员专属指令**只能使用`/`作为前缀，其余功能指令前缀默认为`/`，可通过配置指令自行修改，注意，指令前缀**不可置空**
-   **自动审批**功能是自动通过加群消息**含有关键词**的申请，拒绝检测不到关键词的申请，**若关键词未设置，则全部通过**，所以开启后请及时设置审批关键词

**bot 管理员**可以通过前缀为`/gmc`的一系列指令对**单个模块**的**通用配置**进行设置

```shell
1. /gmc <on/off> : 在群聊中(开启/关闭)群管插件
2. /gmc prefix <前缀> : 修改当前群聊的功能触发前缀
3. /gmc dt : 查看当前群聊所有配置项

4. /gmc <模块名> <on/off> : 在当前群聊(开启/关闭)模块功能

5. /gmc <模块名> dt : 查看模块所有配置项
6. /gmc <模块名> list : 查看模块的权限组

7. /gmc <模块名> + <角色> : 将角色添加到模块的权限组中
8. /gmc <模块名> - <角色> : 将角色从模块的权限组中移除

9. /gmc <模块名> at <on/off> : (开启/关闭)模块的at功能

当前模块有:
1. muteAll 全员禁言
2. mute 单独禁言
3. admin 设置管理员
4. title 设置头衔
5. remove 踢出群聊
6. access 自动审批


当前角色有:
1. owner 群主
2. admin 管理员
3. member 群员
```

**具体功能**可以通过前缀为`/(默认,可修改)`的一系列指令使用本插件

```shell
muteAll模块(不具有at功能):
    1. /all : 开启全员禁言
    2. /deall : 关闭全员禁言

mute模块:
    1. /禁 <qq号/@某人> <时间(m)> : 将目标禁言相应时间
    2. /禁 <qq号/@某人> : 将目标禁言默认时长(1h)
    3. /禁 <qq号/@某人> <r/R/随>: 将目标禁言随机时间
    4. /禁 <qq号/@某人> 0 : 将目标解除禁言
    5. /解 <qq号/@某人> : 将目标解除禁言
    6. /默认禁言 <时长(分钟为单位)> : 设置禁言默认时长

admin模块：
    1. /管理+ <qq号/@某人> : 将目标设置为群管理员
    2. /管理- <qq号/@某人> : 取消目标的群管理员

title模块:
    1. /头衔 <qq号/@某人> <头衔/空> : 设置目标头衔，若未填入头衔或置空则清空目标头衔
    2. /申请头衔 <头衔/空> : 将自己的头衔设置为目标，若未填入头衔则清空(默认群员可使用)
    3. /开启申请头衔 : 开启群员自行申请头衔权限
    4. /关闭申请头衔 : 关闭群员自行申请头衔权限
    tips:头衔应当小于等于12个字符,中文算两个字符,其余算一个字符

remove模块:
    1. /踢 <qq号/@某人> <时间(h)/永久> : 将目标移出群聊并拉黑目标时间/永久(默认24h)
    2. /默认拉黑 <时长(小时为单位)> : 设置拉黑默认时长

access模块:
    ***词条可使用空格分割一次添加多个,如 /词条+ github kivi bot,如此三个词语都将加入审批词条+***
    ***移除词条同理,可一次移除多个词条***
    ***黑名单也同理***
    1. /查看词条 : 查看本群审批词条
    2. /词条+ <词条> : 增加审批词条
    3. /词条- <词条> : 移除审批词条

    4. /查看分管 : 查看本群分管(分管可接受加群请求的处理结果)
    5. /分管+ <qq号/@某人> : 将目标添加至本群分管
    6. /分管- <qq号/@某人> : 将目标从本群分管移除
    7. /查看黑名单 : 查看本群黑名单
    8. /黑+ <qq号/@某人> : 将目标加入本群黑名单
    9. /黑- <qq号/@某人> : 将目标从本群黑名单移除
    10. /拒绝理由 <理由> : 设置群黑名单默认拒绝理由
    ---以下指令只支持bot管理员使用(同时支持群聊和私聊)---
    11. /所有词条 : 查看bot所在的所有启用过插件的群聊的审批词条
    12. /所有分管 : 查看bot所在的所有启用过插件的群聊的分管设置
    13. /所有黑名单 : 查看bot所在的所有启用过插件的群聊的黑名单
    14. /全局黑+ <qq号> : 将目标加入全局黑名单
    15. /全局黑- <qq号> : 将目标从全局黑名单移除
    16. /指定词条+ <群号> <词条> : 为指定群聊添加审批词条
    17. /指定词条- <群号> <词条> : 移除指定群聊的审批词条

```

**默认配置**

1. 插件配置

```typescript
//对于插件整体，有如下默认配置
PluginConfig: {
    // 默认启用群聊为空，bot管理员执行/gmc on在群内启用群管插件
    enableGroups: [],
    // 用户全局黑名单，在内的用户加群自动拒绝
    globalBlackList:[],
    // 各群聊详细配置
    groupConfigs:[]
},
```

2. 群聊统一配置

```typescript
//对于单个模块，插件有如下默认配置
GroupConfig: {
    // 默认指令前缀为 `/`
    cmdPrefix: '/';
    // 默认模块全部启用
    enableModules: ["muteAll","mute","admin","title","remove","access"];
    // 各模块配置
    ModuleConfig:...
},
```

3. 模块统一配置

```typescript
//对于单个模块，插件有如下默认配置
moduleConfig: {
    // 默认启用模块
    enable: true;
    // 模块名
    name: ModuleName;
    // 模块默认权限集为群主、管理员,即群主和管理员可以使用本模块功能
    permissionList: ["owner","admin"],
    // 默认开启at功能（若模块具有at功能）
    enableAt: true,
},
```

4. 模块单独配置

```typescript
//对于头衔模块，有如下默认配置
TitleConfig: {
    // 默认开启群员可使用申请头衔指令,关闭后群员将无法自行申请头衔
    enableSelf: true,
},

//对于单独禁言模块，有如下默认配置
MuteConfig: {
    // 默认禁言时间为 1h(60m)
    defaultTime: 1h,
},

//对于单独禁言模块，有如下默认配置
RemoveConfig: {
    // 默认禁言时间为 24h
    defaultTime: 24h,
},

//对于自动，有如下默认配置
AccessConfig: {
    // 默认黑名单拒绝理由
    refuseMsg: "您已被本群拉黑，请勿重复申请"
},
```

**TODO**

1. [x] ~~全员禁言及解除~~
2. [x] ~~设置/取消管理~~
3. [x] ~~设置头衔~~
4. [x] ~~申请头衔~~
5. [x] ~~自定义前缀~~
6. [x] ~~自动审批~~
7. [x] ~~全局黑名单~~
8. [x] ~~分群功能~~
9. [ ] 违禁词检测
10. [ ] 精华消息
11. [x] ~~单独禁言~~
12. [ ] 改名片
13. [x] ~~踢出~~
14. [ ] 撤回
15. [ ] help

#### 更新日志

-   1.4.0 [#issue3](https://github.com/Linxaee/kivibot-plugin-group-manager/issues/3)
    -   新增**自定义**默认群黑名单拒绝理由,见 access 模块指令**第 10 条**
    -   新增因**关键词**、**临时拉黑**被拒绝入群时的拒绝理由
-   1.3.8 [#issue2](https://github.com/Linxaee/kivibot-plugin-group-manager/issues/2)

    -   **修改指令** /踢 <qq号/@某人> 为 /踢 <qq号/@某人> **<时间(h)/永久>**
    -   **修改指令** /默认时间 <时长(分钟为单位)> 为 /默认禁言 <时长(分钟为单位)>
    -   禁言的默认时长修改为以**分钟**为单位

-   1.3.7 [#issue1](https://github.com/Linxaee/kivibot-plugin-group-manager/issues/1)
    -   **修改指令** /禁 <qq号/@某人> 功能为 **禁言目标默认时长(1h,可配置)**
    -   将随机禁言指令**更改**为 /禁 <qq号/@某人> <r/R/随>
-   1.3.6
    -   新增**踢出功能**
    -   完善配置文件处理
    -   **future**: 集群管理（支持特殊场景下使用的用户以几个群或更多的群为单位建立一个集群进行管理）[`详细使用说明`](./src/module/cluster/README.md)
        **感谢**[@sugar-zero](https://github.com/sugar-zero)对本功能的编写和维护
-   1.3.5 (重大更新)
    -   新增**黑名单功能**:在黑名单或全局黑名单的用户申请入群自动拒绝
    -   新增**分群功能**: 各个群聊配置全部独立，每个群聊都有自己的独立前缀、黑名单、模块设置等
    -   新增配置版本判断，**低于 1.3.5 版本的配置将被覆盖为初始值**
    -   修复启动插件覆盖原先配置的 bug
-   1.3.2
    -   修复入群申请不审批
-   1.3.1
    -   修复因浅拷贝导致的配置合并失败
-   1.3.0
    -   新增**自动审批**及附属功能(具体查看指令说明)
    -   新增**模块开关**,使用者可根据需求**自行开关模块**(默认全部开启)
-   1.2.2
    -   新增申请头衔功能
    -   重构项目结构
-   1.2.1
    -   修正文档(我觉得文档写错了没必要更一个版本,下次不更了)
-   1.2.0
    -   新增单独禁言模块
-   1.1.0

    -   支持自定义前缀 (默认`/`)
    -   简化指令
        -   原 bot 管理员指令前缀`/gmconfig` 变更为 `/gmc`
        -   权限组操作变为 `+` `-`
        -   删除原功能触发前缀`/gm`，部分指令变为简单中文词

-   1.0.0
    -   支持 全员禁言、设置取消管理、设置头衔

