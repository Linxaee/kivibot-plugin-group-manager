import type { GroupMessageEvent, AtElem } from "@kivibot/core";
/**
 * @description 群消息事件中第一个at的成员uid
 * @param e 群消息事件
 */
export const handleAt = (e: GroupMessageEvent) => {
    const { message } = e;
    const firstAt = message.find(msg => msg.type === "at") as AtElem;
    if (firstAt?.qq === "all") return undefined;
    return firstAt ? firstAt?.qq : undefined;
};
