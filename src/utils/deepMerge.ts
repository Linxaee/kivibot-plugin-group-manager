/**
 * @description 将source对象深合并进target对象
 * @param target 目标对象
 * @param source 源对象
 * @returns
 */
export const deepMerge = (target: any, source: any) => {
    const merged = { ...target };
    for (const key in source) {
        if (source[key] instanceof Object && !(source[key] instanceof Array)) {
            merged[key] = deepMerge(target[key], source[key]);
        } else {
            merged[key] = source[key];
        }
    }
    return merged;
};
