<template>
  <div :class="containerClass">
    <!-- LABEL -->
    <label
      v-if="label"
      :for="id"
      :class="['text-sm font-medium text-gray-700 dark:text-gray-300', labelAlignClass]"
    >
      {{ label }}
    </label>

    <!-- INPUT -->
    <UInput
      :id="id"
      v-model="modelValueLocal"
      :placeholder="placeholder"
      :type="type"
      class="w-full"
     
   
    >
      <template v-if="prefix" #leading>
        <span class="text-gray-500">{{ prefix }}</span>
      </template>

      <template v-if="suffix" #trailing>
        <span class="text-gray-500">{{ suffix }}</span>
      </template>
    </UInput>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: String,
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
  modelValue: [String, Number],
  labelPosition: { type: String, default: "left" }, // left, right, up, bottom
  prefix: String,
  suffix: String,
});

const emit = defineEmits(["update:modelValue", "input", "change", "focus", "blur"]);

/* V-MODEL */
const modelValueLocal = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

/* LABEL + INPUT LAYOUT */
const containerClass = computed(() => {
  const base = "mb-6 gap-1";

  switch (props.labelPosition) {
    case "up":
      return `${base} flex flex-col`;
    case "bottom":
      return `${base} flex flex-col-reverse`;
    case "right":
      return `${base} flex flex-row-reverse items-center gap-4`;
    case "left":
    default:
      return `${base} flex flex-row items-center gap-4`;
  }
});

/* LABEL ALIGNMENT */
const labelAlignClass = computed(() => {
  return props.labelPosition === "right"
    ? "text-right w-max"
    : props.labelPosition === "left"
    ? "w-max"
    : "";
});



</script>
