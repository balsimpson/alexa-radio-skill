<template>
  <label for="toggleStatus" class="flex items-center justify-center space-x-3 cursor-pointer">
    
    <!-- toggle -->
    <div class="relative flex items-center">
      <!-- input -->
      <input
        @change="onChange"
        v-model="inputState"
        type="checkbox"
        id="toggleStatus"
        class="sr-only"
      />
      <!-- line -->
      <div class="block h-8 bg-gray-400 rounded-full w-14 line"></div>
      <!-- dot -->
      <div
        class="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1 "
      ></div>

    </div>
    <div class="mt-1 font-bold text-stone-400">{{ displayText }}</div>
    <!-- label -->
    <!-- <div class="max-w-[200px] mt-2 text-xs font-medium text-gray-700 ">If disabled this component will not show on your homepage</div> -->
  </label>
</template>

<script setup>
const props = defineProps(["checked", "unchecked", "status"]);
const emit = defineEmits();

const inputState = ref(false);
const displayText = ref("");

function onChange(e) {
  inputState.value = e.target.checked;
  // console.log(inputState.value, displayText.value);

  if (e.target.checked) {
    displayText.value = props.checked;
  } else {
    displayText.value = props.unchecked;
  }

  emit("toggled", inputState.value ? true: false);
}

onMounted(() => {
  if (props.status) {
    inputState.value = true;
    displayText.value = props.checked;
  } else {
    inputState.value = false;
    displayText.value = props.unchecked;
  }
});
</script>

<style>
/* Toggle B */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #1397bb;
}
input:checked ~ .line {
  background-color: #1a5a6c;
}
</style>