import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(() => {
  // Initialize auth from localStorage on app load
  // This runs after Pinia is initialized (1.pinia.js runs first alphabetically)
  if (process.client) {
    const authStore = useAuthStore()
    authStore.initAuth()
  }
})
