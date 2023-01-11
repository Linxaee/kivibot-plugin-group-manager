import { versionDetails } from "../map";
export const constructVersionMsg = (newVersion: string, oldVersion: string) => {
    // 是否越界
    let isExceed = false;
    // 两个版本之间的版本
    const betweenVer: string[] = [];
    let details: string[] = [];
    const versions = Object.keys(versionDetails);
    for (let i = 0; i < versions.length; i++) {
        const version = versions[i];
        if (oldVersion < version) betweenVer.push(version);
    }
    if (betweenVer.length === 0) return "";
    if (betweenVer.length > 2) isExceed = true;
    const edge = betweenVer.length > 2 ? 2 : betweenVer.length;
    for (let i = 0; i < edge; i++) {
        const version = betweenVer[i];
        details = details.concat(versionDetails[version]);
    }
    let baseMsg = `〓 群管插件已更新 〓
version: v${oldVersion} => v${newVersion}${isExceed ? "\n插件超过三个版本未更新,现只显示最近两个版本的改动" : ""}
本次更新有如下变动:\n`;
    for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        baseMsg += `${i + 1}. ${detail}\n`;
    }
    baseMsg += `细节请阅读插件说明文档`;
    baseMsg += `\n维护不易，感谢支持~`;
    return baseMsg;
};
