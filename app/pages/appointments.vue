<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Appointments</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Manage and track all patient appointments</p>
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
      >
        <Icon name="lucide:calendar-plus" class="w-5 h-5" />
        <span>New Appointment</span>
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
      <div
        v-for="stat in appointmentStats"
        :key="stat.id"
        class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center"
            :class="stat.bgColor"
          >
            <Icon :name="stat.icon" class="w-5 h-5" :class="stat.iconColor" />
          </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {{ stat.value }}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-400">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 lg:p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by patient name, doctor, or department..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <!-- Status Filter -->
        <select
          v-model="statusFilter"
          class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <!-- Date Filter -->
        <select
          v-model="dateFilter"
          class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
    </div>

    <!-- Appointments List -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">Appointment List</h2>
      </div>
      
      <div class="divide-y divide-slate-200 dark:divide-slate-700">
        <div
          v-for="appointment in filteredAppointments"
          :key="appointment.id"
          class="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
          <div class="flex flex-col lg:flex-row lg:items-center gap-4">
            <!-- Time and Date -->
            <div class="flex items-center gap-4 lg:w-48 shrink-0">
              <div class="w-14 h-14 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md">
                <span class="text-xs font-bold">{{ appointment.date.split(' ')[0] }}</span>
                <span class="text-lg font-bold">{{ appointment.date.split(' ')[1] }}</span>
              </div>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">{{ appointment.time }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ appointment.date.split(' ')[2] }}</p>
              </div>
            </div>

            <!-- Patient Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-sm">
                  {{ appointment.patientName.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-slate-900 dark:text-white mb-1">{{ appointment.patientName }}</h3>
                  <div class="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:user" class="w-4 h-4" />
                      {{ appointment.patientAge }} years
                    </span>
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:stethoscope" class="w-4 h-4" />
                      {{ appointment.department }}
                    </span>
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:user-check" class="w-4 h-4" />
                      Dr. {{ appointment.doctorName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status and Actions -->
            <div class="flex flex-col items-end gap-3 lg:w-40 shrink-0">
              <span
                class="px-3 py-1.5 text-xs font-semibold rounded-full"
                :class="getStatusClass(appointment.status)"
              >
                {{ appointment.status }}
              </span>
              <div class="flex items-center gap-2">
                <button
                  class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                  title="View Details"
                >
                  <Icon name="lucide:eye" class="w-4 h-4" />
                </button>
                <button
                  class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                  title="Edit"
                >
                  <Icon name="lucide:pencil" class="w-4 h-4" />
                </button>
                <button
                  class="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  title="Cancel"
                >
                  <Icon name="lucide:x" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAppointments.length === 0" class="p-12 text-center">
        <Icon name="lucide:calendar-x" class="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <p class="text-slate-600 dark:text-slate-400 font-medium">No appointments found</p>
        <p class="text-sm text-slate-500 dark:text-slate-500 mt-1">Try adjusting your filters</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const statusFilter = ref('all')
const dateFilter = ref('today')

// Appointment statistics
const appointmentStats = ref([
  {
    id: 1,
    label: 'Today',
    value: '12',
    icon: 'lucide:calendar',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    label: 'This Week',
    value: '48',
    icon: 'lucide:calendar-days',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    id: 3,
    label: 'Pending',
    value: '8',
    icon: 'lucide:clock',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    id: 4,
    label: 'Completed',
    value: '156',
    icon: 'lucide:check-circle',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
])

// Appointments data
const appointments = ref([
  {
    id: 1,
    patientName: 'Hansraj',
    patientAge: 45,
    doctorName: 'Dr. Hansraj',
    department: 'Cardiology',
    date: '15 Jan 2024',
    time: '09:00 AM',
    status: 'confirmed',
  },
  {
    id: 2,
    patientName: 'Ankit kalia',
    patientAge: 32,
    doctorName: 'dr rajesh sharma',
    department: 'Pediatrics',
    date: '15 Jan 2024',
    time: '10:30 AM',
    status: 'pending',
  },
  {
    id: 3,
    patientName: 'Ayush',
    patientAge: 58,
    doctorName: 'Ayush joshi',
    department: 'Orthopedics',
    date: '15 Jan 2024',
    time: '11:15 AM',
    status: 'confirmed',
  },
  {
    id: 4,
    patientName: 'sanjay kumar',
    patientAge: 28,
    doctorName: 'dr sachin kumar',
    department: 'Dermatology',
    date: '15 Jan 2024',
    time: '02:00 PM',
    status: 'confirmed',
  },
  {
    id: 5,
    patientName: 'Amit kumar',
    patientAge: 65,
    doctorName: 'dr amit kumar',
    department: 'Neurology',
    date: '15 Jan 2024',
    time: '03:30 PM',
    status: 'pending',
  },
  {
    id: 6,
    patientName: 'Rajesh kumar',
    patientAge: 38,
    doctorName: 'dr rahul kumar',
    department: 'Cardiology',
    date: '16 Jan 2024',
    time: '09:00 AM',
    status: 'confirmed',
  },
  {
    id: 7,
    patientName: 'prashant kumar',
    patientAge: 52,
    doctorName: 'dr anand kumar',
    department: 'Pediatrics',
    date: '16 Jan 2024',
    time: '10:00 AM',
    status: 'completed',
  },
  {
    id: 8,
    patientName: 'vikash kumar',
    patientAge: 29,
    doctorName: 'dr vikash kumar',
    department: 'Dermatology',
    date: '16 Jan 2024',
    time: '01:30 PM',
    status: 'cancelled',
  },
])

// Get status class
const getStatusClass = (status) => {
  const classes = {
    confirmed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  }
  return classes[status] || classes.pending
}

// Filtered appointments
const filteredAppointments = computed(() => {
  let filtered = appointments.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (apt) =>
        apt.patientName.toLowerCase().includes(query) ||
        apt.doctorName.toLowerCase().includes(query) ||
        apt.department.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((apt) => apt.status === statusFilter.value)
  }

  // Date filter (simplified - in real app, would filter by actual dates)
  if (dateFilter.value === 'today') {
    filtered = filtered.filter((apt) => apt.date.includes('15 Jan'))
  }

  return filtered
})
</script>
