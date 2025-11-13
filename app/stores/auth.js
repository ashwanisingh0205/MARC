import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    themePreference: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.user?.name || state.user?.username || null,
  },

  actions: {
    async login(credentials) {
      const { username, password } = credentials

      // Validate credentials
      if (!username || !password || username.length < 3 || password.length < 6) {
        throw new Error('Invalid credentials')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Create user object
      const user = {
        id: Date.now(),
        username: username.trim(),
        email: username.includes('@') ? username.trim() : `${username.trim()}@hospital.com`,
        name: username.trim(),
        role: 'staff',
        loginTime: new Date().toISOString(),
      }

      // Save to state and localStorage
      this.user = user
      this.saveToStorage()

      return { user }
    },

    logout() {
      this.user = null
      this.clearStorage()
    },

    initAuth() {
      if (process.client) {
        const userStr = localStorage.getItem('auth_user')
        
        if (userStr) {
          try {
            this.user = JSON.parse(userStr)
          } catch (e) {
            console.error('Error loading auth data:', e)
            this.logout()
          }
        }
      }
    },

    saveToStorage() {
      if (process.client) {
        localStorage.setItem('auth_user', JSON.stringify(this.user))
      }
    },

    clearStorage() {
      if (process.client) {
        localStorage.removeItem('auth_user')
      }
    },

    setThemePreference(theme) {
      this.themePreference = theme
      if (process.client) {
        localStorage.setItem('themePreference', theme)
      }
    },

    getThemePreference() {
      if (process.client) {
        return this.themePreference || localStorage.getItem('themePreference')
      }
      return this.themePreference
    },
  },
})
