import { defineStore } from 'pinia'
import type { UserSession } from '@/models/UserSession'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    user: null as null | UserSession,
  }),
  getters: {
    userRole: (state) => state.user?.mainRole || null,
  },
  actions: {
    setUser(user: UserSession) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    cleanUser() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
