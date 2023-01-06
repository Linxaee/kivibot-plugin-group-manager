/**
 * @description 将秒格式化成分/小时/天/月
 * @param seconds 秒
 * @param bot bot实例
 */
export const formatSeconds = (seconds: number) => {
    let theTime = seconds; // 需要转换的时间秒
    let theTime1 = 0; // 分
    let theTime2 = 0; // 小时
    let theTime3 = 0; // 天
    if (theTime > 60) {
        theTime1 = theTime / 60;
        theTime = theTime % 60;
        if (theTime1 > 60) {
            theTime2 = theTime1 / 60;
            theTime1 = theTime1 % 60;
            if (theTime2 > 24) {
                //大于24小时
                theTime3 = theTime2 / 24;
                theTime2 = theTime2 % 24;
            }
        }
    }
    let result = "";
    if (theTime > 0) {
        result = "" + Math.floor(theTime) + "秒";
    }
    if (theTime1 > 0) {
        result = "" + Math.floor(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + Math.floor(theTime2) + "小时" + result;
    }
    if (theTime3 > 0) {
        result = "" + Math.floor(theTime3) + "天" + result;
    }
    return result;
};
