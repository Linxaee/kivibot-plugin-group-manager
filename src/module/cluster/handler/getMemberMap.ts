import { ClustersConfig } from "../../../config";
import { GroupEventHandler } from "../../types";


export const getMemberMap: GroupEventHandler = (e, plugin, config, argMsg) => {
    console.log(e.group.getMemberMap())
}