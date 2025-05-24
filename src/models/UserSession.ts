import type { GroupedPermissions } from "./GroupedPermissions";

export interface UserSession{
    userId: number,
    entityId:number,
    type:string,
    mainRole:string,
    groupedPermissions:GroupedPermissions
}
