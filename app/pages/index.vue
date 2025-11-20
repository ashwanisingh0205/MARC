<template>
  <div class="h-screen overflow-hidden bg-teal-50 flex flex-col">
    <div class="max-w-7xl my-14 mx-auto px-6 lg:px-12 py-4 flex-1 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
        <!-- Left Section -->
        <div class="flex flex-col justify-between">
          <div class="flex items-center gap-3 mt-4 mb-10">
            <div class="flex flex-col items-center">
              <img
                src="/assets/images/marc.jpg"
                class="w-16 h-16 object-cover rounded-xl"
              />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">MARC</h1>
              <p class="text-sm text-gray-600">
                Healthcare Excellence Platform
              </p>
            </div>
          </div>

          <div class="flex-1">
            <h2
              class="text-5xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Empowering Healthcare Professionals
            </h2>
            <p class="text-lg text-gray-600 mb-12">
              A comprehensive platform designed to streamline hospital
              operations and enhance patient care quality.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div
                v-for="feature in features"
                :key="feature"
                class="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm"
              >
                <div
                  class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
                >
                  <Icon icon="tabler:check" class="w-4 h-4 text-white" />

                </div>
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>

            <div class="flex gap-12">
              <div v-for="stat in stats" :key="stat.label">
                <p class="text-4xl font-bold text-gray-900">{{ stat.value }}</p>
                <p class="text-gray-600">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section - Login Form -->
        <div class="flex flex-col justify-end items-center lg:items-end pb-16">
          <div class="w-full max-w-md">
            <div
              class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative"
            >
              <!-- Logo Icon -->
              <div class="absolute top-6 right-6">
                <img
                  src="/assets/images/marc.jpg"
                  class="w-16 h-16 object-cover rounded-xl"
                />
              </div>

              <!-- Form Header -->
              <div class="mb-2">
                <h3 class="text-3xl font-bold text-gray-900">Sign In</h3>
              </div>
              <p class="text-gray-600 mb-8">Access your hospital dashboard</p>

              <!-- Form -->
              <form @submit.prevent="handleSignIn" class="space-y-6">
                <!-- Username Field -->
                <div class="relative w-full">
                  <label
                    for="username"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username
                  </label>

                  <UInput
                    v-model="username"
                    id="username"
                    placeholder="Enter username"
                    size="lg"
                   icon="i-mdi-account"
                    class="w-full [--ui-input-width:100%]"
                    
                  />
                </div>

                <!-- Password Field -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      class="text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div class="relative w-full">
                    <UInput
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      placeholder="Enter password"
                      size="lg"
                      icon="i-mdi-lock"
                      class="w-full [--ui-input-width:100%]"
                      v-on:click:icon=""
                    />
                  </div>
                </div>

                <!-- Submit Button -->
                <UButton
                  type="submit"
                  class="w-full !bg-gradient-to-r !from-emerald-500 !to-emerald-600 hover:!from-emerald-600 hover:!to-emerald-700 !text-white font-semibold py-3 px-4 rounded-lg transition shadow-md group"
                >
                  <span class="flex w-full items-center justify-center gap-2">
                    Sign In to Dashboard
                    <Icon icon="tabler:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </UButton>
              </form>

              <div class="mt-8 text-center">
                <p class="text-sm text-gray-600">
                  Need assistance?
                  <a
                    href="#"
                    class="text-gray-700 hover:text-gray-900 font-medium ml-1"
                  >
                    Contact
                  </a>
                  <a
                    href="#"
                    class="text-emerald-600 hover:text-emerald-700 font-medium ml-1"
                  >
                    IT Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="-mt-8 pb-6 text-center text-gray-500 text-sm w-full">
      <p>© 2025 MARC. All rights reserved.</p>
      <div class="mt-2 flex justify-center items-center gap-2 text-sm">
        <a href="#" class="hover:text-gray-700">Privacy Policy</a>
        <span>•</span>
        <a href="#" class="hover:text-gray-700">Terms of Service</a>
        <span>•</span>
        <a href="#" class="hover:text-gray-700">Help Center</a>
      </div>
    </footer>

    <!-- Sign In Success Modal -->
    <SignInSuccessModal v-model:open="isModalOpen" @continue="handleContinue" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from '@iconify/vue';

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const isModalOpen = ref(false);

const features = [
  "Patient Record Management",
  "Appointment Scheduling",
  "Prescription Management",
  "Lab Results Integration",
];

const stats = [
  { value: "500+", label: "Hospitals" },
  { value: "50K+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
];

const handleSignIn = () => {
  console.log("Sign in attempted", {
    // username: username.value,
    // keepSignedIn: keepSignedIn.value,
  });
  // Open the modal
  isModalOpen.value = true;
};

const handleContinue = () => {
  console.log("Continue to dashboard");
  // Add your navigation logic here
};
</script>
