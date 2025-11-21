<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Left Icon Sidebar -->
    <aside class="w-16 bg-white flex flex-col" aria-label="Main navigation sidebar">
      <!-- Logo -->
      <div class="h-16 flex items-center justify-center border-b border-gray-200">
        <img 
          src="/assets/images/NHS-logo.png" 
          alt="NHS Logo" 
          class="h-10 w-10 object-contain"
        />
      </div>

      <!-- Navigation Icons -->
      <nav class="flex-1 flex flex-col items-center py-4 space-y-2" aria-label="Main navigation">
        <Ubutton
          v-for="item in mainNavItems"
          :key="item.name"
          @click="activeSection = item.id"
          class="w-10 h-10 flex items-center justify-center rounded-lg transition-all relative group"
          :class="activeSection === item.id 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'"
          :title="item.name"
        >
          <UIcon :name="item.icon" class="w-5 h-5" />
          
        </Ubutton>
      </nav>

      
    </aside>

    <!-- Secondary Navigation Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col" aria-label="Secondary navigation sidebar">
      <!-- Header -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <h2 class="font-semibold text-gray-900">{{ currentSectionName }}</h2>
        <UButton
          variant="ghost"
          color="gray"
          icon="lucide:plus"
          size="sm"
          :ui="{ rounded: 'rounded-lg' }"
        />
      </div>

      <!-- Search -->
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <UIcon name="lucide:search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto p-3" aria-label="Secondary navigation menu">
        <div class="space-y-1">
          <template v-for="item in currentNavItems" :key="item.name">
            <!-- Menu Item without children -->
            <NuxtLink
              v-if="!item.children"
              :to="item.path"
              class="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm group"
              :class="isActive(item.path) 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'"
            >
              <div class="flex items-center gap-3">
                <UIcon :name="item.icon" class="w-4 h-4" />
                <span>{{ item.name }}</span>
              </div>
              <UIcon 
                v-if="item.count" 
                name="lucide:chevron-right" 
                class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </NuxtLink>

            <!-- Menu Item with children -->
            <div v-else>
              <button
                @click="toggleExpanded(item.name)"
                class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm text-gray-700 hover:bg-gray-50"
              >
                <div class="flex items-center gap-3">
                  <UIcon :name="item.icon" class="w-4 h-4" />
                  <span>{{ item.name }}</span>
                </div>
                <UIcon 
                  name="lucide:chevron-down" 
                  class="w-4 h-4 transition-transform duration-200 text-gray-400"
                  :class="expandedItems.includes(item.name) ? 'rotate-180' : ''"
                />
              </button>
              
              <!-- Children -->
              <div
                v-if="expandedItems.includes(item.name)"
                class="ml-7 mt-1 space-y-1"
              >
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.path"
                  class="flex items-center px-3 py-2 rounded-lg transition-all text-sm"
                  :class="isActive(child.path) 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
                >
                  {{ child.name }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </nav>

     
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header -->
      <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
         <!-- Breadcrumb -->
         <nav class="flex items-center gap-2 text-sm" aria-label="Breadcrumb navigation">
          <span class="text-gray-500">Home</span>
          <UIcon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
          <span class="text-gray-500">{{ currentSectionName }}</span>
          <UIcon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
          <span class="text-gray-900 font-medium">{{ pageTitle || 'Overview' }}</span>
        </nav>

        <!-- Actions -->
        
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <!-- Page Title Section -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ pageTitle || 'Dashboard' }}</h1>
          <p v-if="pageDescription" class="text-gray-600">{{ pageDescription }}</p>
        </div>

        <!-- Content Slot -->
        <div>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['pageTitle', 'pageDescription']);
const route = useRoute();

const activeSection = ref('dashboard');
const expandedItems = ref(['Settings', 'Team']);

const mainNavItems = [
  { id: 'dashboard', name: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { id: 'projects', name: 'Projects', icon: 'lucide:folder', badge: '3' },
  { id: 'analytics', name: 'Analytics', icon: 'lucide:bar-chart-3' },
  { id: 'team', name: 'Team', icon: 'lucide:users' },
  { id: 'messages', name: 'Messages', icon: 'lucide:message-square', badge: '12' },
  { id: 'calendar', name: 'Calendar', icon: 'lucide:calendar' },
  { id: 'files', name: 'Files', icon: 'lucide:file-text' },
];

const navSections = {
  dashboard: [
    { name: 'Overview', path: '/dashboard', icon: 'lucide:home' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: 'lucide:trending-up' },
    { name: 'Reports', path: '/dashboard/reports', icon: 'lucide:file-bar-chart' },
    { name: 'Statistics', path: '/dashboard/stats', icon: 'lucide:pie-chart' },
  ],
  projects: [
    { name: 'All Projects', path: '/projects', icon: 'lucide:folder-open' },
    { name: 'Active', path: '/projects/active', icon: 'lucide:zap' },
    { name: 'Archived', path: '/projects/archived', icon: 'lucide:archive' },
    { name: 'Templates', path: '/projects/templates', icon: 'lucide:layout-template' },
  ],
  analytics: [
    { name: 'Overview', path: '/analytics', icon: 'lucide:activity' },
    { name: 'Traffic', path: '/analytics/traffic', icon: 'lucide:trending-up' },
    { name: 'Conversion', path: '/analytics/conversion', icon: 'lucide:target' },
    { name: 'Revenue', path: '/analytics/revenue', icon: 'lucide:dollar-sign' },
  ],
  team: [
    { name: 'Members', path: '/team/members', icon: 'lucide:users' },
    { name: 'Roles', path: '/team/roles', icon: 'lucide:shield' },
    { name: 'Permissions', path: '/team/permissions', icon: 'lucide:lock' },
    { 
      name: 'Settings', 
      path: '/team/settings', 
      icon: 'lucide:settings',
      children: [
        { name: 'General', path: '/team/settings/general' },
        { name: 'Security', path: '/team/settings/security' },
        { name: 'Notifications', path: '/team/settings/notifications' },
      ]
    },
  ],
  messages: [
    { name: 'Inbox', path: '/messages', icon: 'lucide:inbox' },
    { name: 'Sent', path: '/messages/sent', icon: 'lucide:send' },
    { name: 'Drafts', path: '/messages/drafts', icon: 'lucide:file-edit' },
    { name: 'Archived', path: '/messages/archived', icon: 'lucide:archive' },
  ],
  calendar: [
    { name: 'Month View', path: '/calendar', icon: 'lucide:calendar-days' },
    { name: 'Week View', path: '/calendar/week', icon: 'lucide:calendar-range' },
    { name: 'Events', path: '/calendar/events', icon: 'lucide:calendar-check' },
    { name: 'Reminders', path: '/calendar/reminders', icon: 'lucide:bell' },
  ],
  files: [
    { name: 'All Files', path: '/files', icon: 'lucide:folder' },
    { name: 'Recent', path: '/files/recent', icon: 'lucide:clock' },
    { name: 'Shared', path: '/files/shared', icon: 'lucide:share-2' },
    { name: 'Trash', path: '/files/trash', icon: 'lucide:trash-2' },
  ],
};

const currentNavItems = computed(() => navSections[activeSection.value] || []);

const currentSectionName = computed(() => {
  const section = mainNavItems.find(item => item.id === activeSection.value);
  return section ? section.name : 'Dashboard';
});

const toggleExpanded = (itemName) => {
  const index = expandedItems.value.indexOf(itemName);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(itemName);
  }
};

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/');
};
</script>