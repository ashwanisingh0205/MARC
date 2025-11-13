<template>
    <div class="max-w-2xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Registration Form
      </h1>
  
      <form
        @submit.prevent="handleSubmit"
        class="bg-white dark:bg-gray-800 border rounded-lg shadow p-6"
      >
  
        <!-- Dynamic Fields -->
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
  
        <!-- Label Position Selector -->
        <div class="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
          <label class="block mb-2 text-sm font-medium">Label Position</label>
  
          <select
            v-model="labelPosition"
            class="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border dark:border-gray-600"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="up">Up</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
  
      
            <UButton type="submit" color="primary" class="w-full mt-6 align-items-center justify-center" to="/navigate">
              Submit
            </UButton>
      </form>
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
  