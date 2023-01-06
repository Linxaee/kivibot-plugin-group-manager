export const deepMerge = (obj1: any, obj2: any) => {
    const merged = { ...obj1 };
    for (const key in obj2) {
        if (obj2[key] instanceof Object && !(obj2[key] instanceof Array)) {
            merged[key] = deepMerge(obj1[key], obj2[key]);
        } else {
            merged[key] = obj2[key];
        }
    }

    return merged;
};
