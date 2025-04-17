import type { AuthenticationService } from '../domain/services/AuthenticationService'
import type { User, UserRequest } from '../domain/models/User'

export class AuthApi implements AuthenticationService {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    return {
      id: data.user.id,
      rol: data.user.rol,
      name: data.user.name,
      lastname: data.user.lastname,
    }
  }
  async register(user: UserRequest): Promise<User> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    return {
      id: data.user.id,
      rol: data.user.rol,
      name: data.user.name,
      lastname: data.user.lastname,
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
