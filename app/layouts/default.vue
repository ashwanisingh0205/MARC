<script setup>
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const colorMode = useColorMode()

// UI State
const sidebarOpen = ref(false)
const headerVisible = ref(true)
const lastScrollY = ref(0)

// Constants
const SCROLL_THRESHOLD = 10
const SCROLL_HIDE_THRESHOLD = 100
const SCROLL_SHOW_THRESHOLD = 50
const DESKTOP_BREAKPOINT = 1024

// Navigation configuration
const navigation = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/dashboard' },
  { label: 'Patients', icon: 'lucide:users', to: '/patient' },
  { label: 'Appointments', icon: 'lucide:calendar-check', to: '/Appointments' },
  { label: 'Settings', icon: 'lucide:settings', to: '/settings' },
]

// Computed
const isDark = computed(() => colorMode.value === 'dark')
const currentPageTitle = computed(() => {
  const currentPath = route.path.toLowerCase()
  return navigation.find(nav => {
    const navPath = nav.to.toLowerCase()
    return currentPath === navPath || currentPath.startsWith(navPath + '/')
  })?.label || 'Dashboard'
})

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleNavClick = () => {
  if (process.client && window.innerWidth < DESKTOP_BREAKPOINT) {
    sidebarOpen.value = false
  }
}

const handleScroll = () => {
  if (!process.client) return
  
  const currentScrollY = window.scrollY
  const scrollDelta = Math.abs(currentScrollY - lastScrollY.value)
  
  if (scrollDelta < SCROLL_THRESHOLD) return
  
  if (currentScrollY < SCROLL_SHOW_THRESHOLD) {
    headerVisible.value = true
  } else if (currentScrollY > lastScrollY.value && currentScrollY > SCROLL_HIDE_THRESHOLD) {
    headerVisible.value = false
  } else if (currentScrollY < lastScrollY.value) {
    headerVisible.value = true
  }
  
  lastScrollY.value = currentScrollY
}

const toggleTheme = () => {
  const newTheme = colorMode.value === 'dark' ? 'light' : 'dark'
  colorMode.preference = newTheme
  
  if (authStore.isAuthenticated) {
    authStore.setThemePreference(newTheme)
  }
}

const isActiveRoute = (navPath) => {
  const currentPath = route.path.toLowerCase()
  const normalizedNavPath = navPath.toLowerCase()
  return currentPath === normalizedNavPath || currentPath.startsWith(normalizedNavPath + '/')
}

const logout = async () => {
  authStore.logout()
  await navigateTo('/')
}

// Initialize
onMounted(() => {
  if (!process.client) return
  
  // Initialize sidebar based on screen size
  const checkScreenSize = () => {
    sidebarOpen.value = window.innerWidth >= DESKTOP_BREAKPOINT
  }
  
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Initialize theme from user preference or system
  const initializeTheme = () => {
    if (authStore.isAuthenticated) {
      const userTheme = authStore.getThemePreference()
      if (userTheme) {
        colorMode.preference = userTheme
        return
      }
    }
    
    const savedTheme = localStorage.getItem('nuxt-color-mode')
    if (savedTheme) {
      colorMode.preference = savedTheme
    }
  }
  
  initializeTheme()
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
    window.removeEventListener('scroll', handleScroll)
  })
})

// Watch for theme changes to save user preference
watch(() => colorMode.value, (newMode) => {
  if (authStore.isAuthenticated && process.client) {
    authStore.setThemePreference(newMode)
  }
})

// Watch for user login to load theme preference
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth && process.client) {
    const userTheme = authStore.getThemePreference()
    if (userTheme) {
      colorMode.preference = userTheme
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center gap-3 h-20 px-6 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
        <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
          <Icon name="lucide:hospital" class="w-7 h-7" />
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">NHS Hospital</h1>
          <p class="text-xs text-slate-600 dark:text-slate-400 font-medium">Management System</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
          :class="{
            'bg-gradient-to-r from-teal-500 to-cyan-300 text-white dark:text-black shadow-md shadow-teal-500/30 scale-[1.02]': isActiveRoute(item.to),
            'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100': !isActiveRoute(item.to),
          }"
          @click="handleNavClick"
        >
          <Icon 
            :name="item.icon" 
            class="w-5 h-5 shrink-0"
            :class="isActiveRoute(item.to) ? 'text-white dark:text-black' : 'text-slate-500 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white'"
          />
          <span class="font-semibold text-sm">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- User Section -->
      <div class="px-4 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 mt-auto bg-slate-50 dark:bg-slate-900/50">
        <div class="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="relative">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {{ authStore.userName?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {{ authStore.userName || 'User' }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
              {{ authStore.user?.email || 'user@hospital.com' }}
            </p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-full border-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800  border-red-500 dark:border-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:hover:border-red-600 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
        >
          <Icon name="lucide:log-out" class="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
      @click="sidebarOpen = false"
    />

    <!-- Main Content -->
    <div :class="['transition-all duration-300 ease-in-out', sidebarOpen ? 'lg:pl-72' : 'lg:pl-0']">
      <!-- Header -->
      <header 
        class="sticky top-0 z-30 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-transform duration-300 ease-in-out"
        :class="{
          '-translate-y-full': !headerVisible,
          'translate-y-0': headerVisible,
        }"
      >
        <div class="flex items-center justify-between h-full px-4 lg:px-8">
          <div class="flex items-center gap-4">
            <button
              @click="toggleSidebar"
              class="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              :aria-label="sidebarOpen ? 'Close sidebar' : 'Open sidebar'"
            >
              <Icon 
                :name="sidebarOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'" 
                class="w-5 h-5" 
              />
            </button>
            <div class="hidden sm:block">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ currentPageTitle }}</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hospital Management System</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="toggleTheme"
              class="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon
                :name="isDark ? 'lucide:sun' : 'lucide:moon'"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="min-h-[calc(100vh-5rem)] p-4 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
