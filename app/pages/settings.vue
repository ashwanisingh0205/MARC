<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
      <p class="text-slate-600 dark:text-slate-400 mt-1">Manage your account settings and preferences</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Section -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Profile Information -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="p-6 border-b border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Icon name="lucide:user" class="w-5 h-5 text-white" />
              </div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h2>
            </div>
          </div>
          <div class="p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label for="name" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  v-model="profileData.name"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="profileData.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="profileData.phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="role" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Role
                </label>
                <input
                  id="role"
                  v-model="profileData.role"
                  type="text"
                  disabled
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label for="address" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Address
              </label>
              <textarea
                id="address"
                v-model="profileData.address"
                rows="3"
                placeholder="Enter your address"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label for="city" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  City
                </label>
                <input
                  id="city"
                  v-model="profileData.city"
                  type="text"
                  placeholder="Enter your city"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="state" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  State
                </label>
                <input
                  id="state"
                  v-model="profileData.state"
                  type="text"
                  placeholder="Enter your state"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button
                @click="resetProfile"
                class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                @click="saveProfile"
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="p-6 border-b border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Icon name="lucide:shield" class="w-5 h-5 text-white" />
              </div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Account Settings</h2>
            </div>
          </div>
          <div class="p-6 space-y-5">
            <div>
              <label for="currentPassword" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Current Password
              </label>
              <div class="relative">
                <input
                  id="currentPassword"
                  v-model="passwordData.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  placeholder="Enter current password"
                  class="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <Icon :name="showCurrentPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label for="newPassword" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                New Password
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="passwordData.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder="Enter new password"
                  class="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <Icon :name="showNewPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="passwordData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm new password"
                  class="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <Icon :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="flex justify-end pt-2">
              <button
                @click="updatePassword"
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Profile Card -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-4">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {{ authStore.userName?.charAt(0).toUpperCase() || 'U' }}
              </div>
              <button
                class="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-md"
                title="Change Profile Picture"
              >
                <Icon name="lucide:camera" class="w-4 h-4" />
              </button>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {{ authStore.userName || 'User' }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {{ authStore.user?.email || 'user@hospital.com' }}
            </p>
            <div class="w-full pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="text-slate-600 dark:text-slate-400">Member since</span>
                <span class="font-semibold text-slate-900 dark:text-white">
                  {{ formatDate(authStore.user?.loginTime) }}
                </span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-600 dark:text-slate-400">Role</span>
                <span class="px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold text-xs">
                  {{ authStore.user?.role || 'Staff' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Preferences</h2>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-slate-900 dark:text-white text-sm">Email Notifications</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Receive email updates</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="preferences.emailNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-slate-900 dark:text-white text-sm">SMS Notifications</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Receive SMS updates</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="preferences.smsNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
             
             
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border-2 border-red-200 dark:border-red-900/30 shadow-sm">
          <div class="p-6 border-b border-red-200 dark:border-red-900/30">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Icon name="lucide:alert-triangle" class="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 class="text-lg font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
            </div>
          </div>
          <div class="p-6">
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Once you logout, you'll need to login again to access your account.
            </p>
            <button
              @click="handleLogout"
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Icon name="lucide:log-out" class="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Profile data
const profileData = ref({
  name: authStore.userName || '',
  email: authStore.user?.email || '',
  phone: '+91 9876543210',
  role: authStore.user?.role || 'Staff',
  address: '123 Hospital Street, Medical District',
  city: 'Mumbai',
  state: 'Maharashtra',
})

// Password data
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Preferences
const preferences = ref({
  emailNotifications: true,
  smsNotifications: false,
  appointmentReminders: true,
})

// Methods
const saveProfile = () => {
  // In real app, this would call an API
  console.log('Saving profile:', profileData.value)
  // Show success message
  alert('Profile updated successfully!')
}

const resetProfile = () => {
  profileData.value = {
    name: authStore.userName || '',
    email: authStore.user?.email || '',
    phone: '+91 9876543210',
    role: authStore.user?.role || 'Staff',
    address: '123 Hospital Street, Medical District',
    city: 'Mumbai',
    state: 'Maharashtra',
  }
}

const updatePassword = () => {
  if (!passwordData.value.currentPassword) {
    alert('Please enter your current password')
    return
  }
  if (!passwordData.value.newPassword) {
    alert('Please enter a new password')
    return
  }
  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    alert('New passwords do not match')
    return
  }
  if (passwordData.value.newPassword.length < 6) {
    alert('Password must be at least 6 characters')
    return
  }
  
  // In real app, this would call an API
  console.log('Updating password')
  alert('Password updated successfully!')
  
  // Reset form
  passwordData.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

const handleLogout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout()
    await navigateTo('/')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>
