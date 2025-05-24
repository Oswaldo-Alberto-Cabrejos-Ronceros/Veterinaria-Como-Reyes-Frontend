import type { UserSession } from '@/models/UserSession'
import type { User, UserClientRequest } from '@/services/Authentication/domain/models/User'
import { GroupedPermissionsAdapter } from './GroupedPermissionsAdapter'
import type { UserClientRegister } from '@/models/UserClientRegister'

export class UserAdapter {
  //for adapt user to userSession
  static toUserSession(user: User): UserSession {
    return {
      userId: user.userId,
      entityId: user.entityId,
      type: user.type,
      mainRole: user.mainRole,
      groupedPermissions: GroupedPermissionsAdapter.toGroupedPermissionView(
        user.groupedPermissions,
      ),
    }
  }
  static userClientRegisterToUserClientRequest(
    userClientRegister: UserClientRegister,
  ): UserClientRequest {
    return userClientRegister as UserClientRequest //because properties equals
  }
}
