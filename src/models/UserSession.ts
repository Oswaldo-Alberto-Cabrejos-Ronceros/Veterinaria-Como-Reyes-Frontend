import type { GroupedPermissions } from "./GrupedPermissions";

export interface UserSession{
    userId: number,
    entityId:number,
    type:string,
    mainRole:string,
    groupedPermissions:GroupedPermissions
}
