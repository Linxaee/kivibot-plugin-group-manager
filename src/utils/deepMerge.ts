/**
 * @description 将source对象深合并进target对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export const deepMerge = (target: any, source: any) => {
    for (const key of Object.keys(source)) {
        // 插件版本更新至最新
        if (key === "configVersion") continue;
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
            // 若目标对象中没有源对象的当前key,则向目标对象添加该key,并将空对象和源对象的value再进行递归合并
            if (!(key in target)) {
                Object.assign(target, { [key]: {} });
            }
            deepMerge(target[key], source[key]);
            // 若groupConfigs还是数组则更新为对象形式
        } else if (Array.isArray(source[key]) && key === "groupConfigs") {
            const newObj = source[key].reduce((total: any, value: any) => {
                const { gid, ...exceptGid } = value;
                total[gid] = exceptGid;
                return total;
            }, {});
            Object.assign(target[key], newObj);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
};
