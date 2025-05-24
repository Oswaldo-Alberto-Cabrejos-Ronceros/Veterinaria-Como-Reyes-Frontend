import type { AuthenticationService } from '../domain/services/AuthenticationService'
import type { User, UserClientRequest } from '../domain/models/User'

export class AuthenticationServiceImpl implements AuthenticationService {
  async loginEmployee(email: string, password: string): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/employee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    const data = await response.json()
    return {
      userId: data.user.id,
      entityId: data.user.entityId,
      type: data.user.type,
      mainRole: data.user.rol,
      groupedPermissions: data.user.groupedPermissions,
    }
  }
  async loginClient(email: string, password: string): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    const data = await response.json()
    return {
      userId: data.user.id,
      entityId: data.user.entityId,
      type: data.user.type,
      mainRole: data.user.rol,
      groupedPermissions: data.user.groupedPermissions,
    }
  }
  async register(user: UserClientRequest): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    })
    const data = await response.json()
    return {
      userId: data.user.id,
      entityId: data.user.entityId,
      type: data.user.type,
      mainRole: data.user.rol,
      groupedPermissions: data.user.groupedPermissions,
    }
  }
  async logout(): Promise<void> {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  }
}
