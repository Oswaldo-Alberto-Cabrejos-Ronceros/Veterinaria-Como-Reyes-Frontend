import type { UserSession } from '@/models/UserSession'
import type { User } from '@/services/Authentication/domain/models/User'
import { GroupedPermissionsAdapter } from './GroupedPermissionsAdapter'

export class UserAdapter {
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
}
