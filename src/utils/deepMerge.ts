/**
 * @description 将source对象深合并进target对象
 * @param target 目标对象
 * @param source 源对象
 * @returns
 */
export const deepMerge = (target: any, source: any) => {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
            if (!(key in target)) {
                Object.assign(target, { [key]: {} });
            }
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
};
