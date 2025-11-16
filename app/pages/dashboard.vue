<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold mb-2">Welcome back, Dr. {{ userName }}</h2>
          <p class="text-teal-50 text-sm lg:text-base">Here's what's happening at your hospital today</p>
        </div>
        <div class="hidden lg:block">
          <Icon name="lucide:activity" class="w-16 h-16 text-white/20" />
        </div>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <div
        v-for="stat in stats"
        :key="stat.id"
        class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="stat.bgColor"
          >
            <Icon :name="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
          </div>
          <span
            class="text-xs font-semibold px-2.5 py-1 rounded-full"
            :class="stat.badgeClass"
          >
            {{ stat.change }}
          </span>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {{ stat.value }}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-400">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Appointments -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Today's Appointments</h3>
            <NuxtLink
              to="/Appointments"
              class="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1"
            >
              View all
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="appointment in recentAppointments"
              :key="appointment.id"
              class="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-slate-100 dark:border-slate-700"
            >
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                :class="appointment.statusBg"
              >
                <Icon :name="appointment.icon" class="w-6 h-6" :class="appointment.iconColor" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-slate-900 dark:text-white">{{ appointment.patientName }}</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">{{ appointment.department }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <Icon name="lucide:clock" class="w-3.5 h-3.5 text-slate-400" />
                  <span class="text-xs text-slate-500 dark:text-slate-400">{{ appointment.time }}</span>
                </div>
              </div>
              <span
                class="px-3 py-1 text-xs font-semibold rounded-full shrink-0"
                :class="appointment.statusClass"
              >
                {{ appointment.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Stats -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-3">
              <NuxtLink
                to="/patient"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors group"
              >
                <Icon name="lucide:user-plus" class="w-6 h-6 text-teal-600 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-semibold text-teal-700 dark:text-teal-300">New Patient</span>
              </NuxtLink>
              <NuxtLink
                to="/Appointments"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors group"
              >
                <Icon name="lucide:calendar-plus" class="w-6 h-6 text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-semibold text-cyan-700 dark:text-cyan-300">New Appointment</span>
              </NuxtLink>
              <NuxtLink
                to="/patient"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <Icon name="lucide:file-text" class="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-semibold text-blue-700 dark:text-blue-300">Reports</span>
              </NuxtLink>
              <NuxtLink
                to="/settings"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
              >
                <Icon name="lucide:settings" class="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-semibold text-purple-700 dark:text-purple-300">Settings</span>
              </NuxtLink>
            </div>
          </div>
        </div>
  
        <!-- Department Stats -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Department Overview</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="dept in departments"
                :key="dept.name"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="dept.bgColor">
                    <Icon :name="dept.icon" class="w-5 h-5" :class="dept.iconColor" />
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white text-sm">{{ dept.name }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ dept.patients }} patients</p>
                  </div>
                </div>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ dept.appointments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="p-6 border-b border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              :class="activity.bgColor"
            >
              <Icon :name="activity.icon" class="w-5 h-5" :class="activity.iconColor" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-slate-900 dark:text-white">
                <span class="font-semibold">{{ activity.user }}</span>
                {{ activity.action }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const userName = computed(() => authStore.userName || 'Smith')

// Stats data
const stats = ref([
  {
    id: 1,
    label: 'Total Patients',
    value: '1,247',
    change: '+12%',
    icon: 'lucide:users',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  {
    id: 2,
    label: "Today's Appointments",
    value: '48',
    change: '+5',
    icon: 'lucide:calendar-check',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badgeClass: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
  },
  {
    id: 3,
    label: 'Available Beds',
    value: '142',
    change: '85%',
    icon: 'lucide:bed',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    badgeClass: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  },
  {
    id: 4,
    label: 'Monthly Revenue',
    value: '₹124.5K',
    change: '+8.2%',
    icon: 'lucide:trending-up',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    badgeClass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
])

// Recent appointments
const recentAppointments = ref([
  {
    id: 1,
    patientName: 'Hansraj',
    department: 'Cardiology',
    time: '09:00 AM',
    status: 'Confirmed',
    statusClass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    statusBg: 'bg-green-100 dark:bg-green-900/30',
    icon: 'lucide:heart',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 2,
    patientName: 'Ankit kalia',
    department: 'Pediatrics',
    time: '10:30 AM',
    status: 'Pending',
    statusClass: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    statusBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: 'lucide:heart-pulse',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: 3,
    patientName: 'Ayush Anand',
    department: 'Orthopedics',
    time: '11:15 AM',
    status: 'Confirmed',
    statusClass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    statusBg: 'bg-green-100 dark:bg-green-900/30',
    icon: 'lucide:bone',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 4,
    patientName: 'Virender kumar',
    department: 'Dermatology',
    time: '02:00 PM',
    status: 'Confirmed',
    statusClass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    statusBg: 'bg-green-100 dark:bg-green-900/30',
    icon: 'lucide:activity',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 5,
    patientName: 'Sanjay kumar',
    department: 'Neurology',
    time: '03:30 PM',
    status: 'Pending',
    statusClass: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    statusBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: 'lucide:brain',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
])

// Departments
const departments = ref([
  {
    name: 'Cardiology',
    patients: 156,
    appointments: 12,
    icon: 'lucide:heart',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'Pediatrics',
    patients: 203,
    appointments: 18,
    icon: 'lucide:heart-pulse',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    name: 'Orthopedics',
    patients: 128,
    appointments: 8,
    icon: 'lucide:bone',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Neurology',
    patients: 94,
    appointments: 6,
    icon: 'lucide:brain',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
])

// Recent activity
const recentActivity = ref([
  {
    id: 1,
    user: 'Dr. hansraj',
    action: 'admitted a new patient to Cardiology',
    time: '2 minutes ago',
    icon: 'lucide:user-plus',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    user: 'Ankit kalia',
    action: 'updated patient records',
    time: '15 minutes ago',
    icon: 'lucide:file-text',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    id: 3,
    user: 'Dr. Sanjay',
    action: 'completed surgery in Operating Room 3',
    time: '1 hour ago',
    icon: 'lucide:scalpel',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  {
    id: 4,
    user: 'virender kumar',
    action: 'scheduled 5 new appointments',
    time: '2 hours ago',
    icon: 'lucide:calendar-plus',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
])
  </script>
  