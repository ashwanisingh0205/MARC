<template>
  <div :class="containerClass">
    <!-- LABEL -->
    <label
      v-if="label"
      :for="id"
      :class="[
        'text-sm font-medium text-gray-700 dark:text-gray-300',
        labelAlignClass
      ]"
    >
      {{ label }}
    </label>

    <!-- INPUT WRAPPER -->
    <div class="flex-1 w-full">
      <UInput
        :id="id"
        v-model="modelValueLocal"
        :placeholder="placeholder"
        :type="type"
        class="w-full"
  
      >
        <!--  -->
      </UInput>
    </div>
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

/* LABEL + INPUT WRAPPER STYLE */
const containerClass = computed(() => {
  switch (props.labelPosition) {
    case "up":
      return "flex flex-col gap-1 mb-6";
    case "bottom":
      return "flex flex-col-reverse gap-1 mb-6";
    case "right":
      return "flex flex-row-reverse items-center gap-4 mb-6";
    case "left":
    default:
      return "flex flex-row items-center gap-4 mb-6";
  }
});

/* LABEL ALIGNMENT */
const labelAlignClass = computed(() => {
  if (props.labelPosition === "right") return "text-right w-max";
  if (props.labelPosition === "left") return "w-max";
  return "";
});

</script>
