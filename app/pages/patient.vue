<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl lg:text-3xl font-bold mb-2">Patient Registration</h1>
          <p class="text-teal-50 text-sm lg:text-base">Register a new patient to the system</p>
        </div>
        <div class="hidden lg:block">
          <Icon name="lucide:user-plus" class="w-16 h-16 text-white/20" />
        </div>
      </div>
    </div>

    <!-- Form Container -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <!-- Form Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-teal-50/30 dark:from-slate-800 dark:to-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <Icon name="lucide:clipboard-list" class="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Registration Form</h2>
            <p class="text-xs text-slate-600 dark:text-slate-400">Fill in the patient details below</p>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <form
        @submit.prevent="handleSubmit"
        class="p-6 lg:p-8"
      >
        <!-- Dynamic Fields -->
        <div class="space-y-5">
          <CustomFormField
            v-for="field in formFields"
            :key="field.id"
            :id="field.id"
            :label="field.label"
            :placeholder="field.placeholder"
            :type="field.type"
            :label-position="labelPosition"
            v-model="formData[field.model]"
          />
        </div>

        <!-- Label Position Selector -->
        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center gap-3 mb-4">
            <Icon name="lucide:settings-2" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <label for="labelPosition" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Label Position</label>
          </div>
          <select
            id="labelPosition"
            v-model="labelPosition"
            class="w-1/8  px-4 py-2.5 rounded-xl  bg-white dark:bg-slate-700 border-1 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="up">Up</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <UButton 
            type="submit" 
            color="secondary" 
            class="w-full flex items-center justify-center gap-2 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200" 
            to="/dashboard"
          >
            <Icon name="lucide:check-circle" class="w-5 h-5" />
            <span>Submit Registration</span>
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref } from "vue";
  import CustomFormField from "@/components/CustomFormField.vue";
  
  const labelPosition = ref("left");
  
  const formFields = [
    { id: "name", model: "name", label: "Name", type: "text", placeholder: "Enter name", },
    { id: "email", model: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { id: "password", model: "password", label: "Password", type: "password", placeholder: "Enter password" },
    { id: "hospitalName", model: "hospitalName", label: "Hospital Name", type: "text", placeholder: "Hospital name" },
    { id: "address", model: "address", label: "Address", type: "text", placeholder: "Enter address" },
    { id: "date", model: "date", label: "Date", type: "date" },
  ];
  
  const formData = ref({
    name: "",
    email: "",
    password: "",
    hospitalName: "",
    address: "",
    description: "",
    date: "",
  });
  
  const handleSubmit = () => {
    alert(JSON.stringify(formData.value, null, 2));
  };
  </script>
  