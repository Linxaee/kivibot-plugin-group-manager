export const validateTitle = (title: string) => {
    let titleLen = title.replace(/[^x00-xff]/g, "AA").length;
    return !(titleLen > 12);
};
