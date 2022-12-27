<template>
  <form class="p-4 border-2 rounded-lg border-stone-800 bg-stone-900 section" ref="el">
    <h2 class="mb-1 text-xl font-bold">{{ title }}</h2>
    <p class="mb-4 text-sm">{{ description }}</p>
    <div class="space-y-2">
      <input
      @keyup="onUpdate"
        v-model="input1"
        class="form-input"
        type="text" :placeholder="placeholder">
      <input
      @keyup="onUpdate"
        v-model="input2"
        class="form-input"
        type="text" :placeholder="placeholder">
      <input
      @keyup="onUpdate"
        v-model="input3"
        class="form-input"
        type="text" :placeholder="placeholder">
    </div>
    <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
  </form>
</template>

<script setup>
const props = defineProps(["title", "description", "placeholder", "inputs"])
const emit = defineEmits(["update"])

const el = ref()

const input1 = ref("")
const input2 = ref("")
const input3 = ref("")

onMounted(() => {
  // console.log("inputs", props.inputs)
  input1.value = props.inputs[0] || ""
  input2.value = props.inputs[1] || ""
  input3.value = props.inputs[2] || ""

  observeElements([el.value]);
})

const onUpdate = () => {
  emit("update", [input1.value, input2.value, input3.value])
  // console.log("onUpdate", [input1.value, input2.value, input3.value])
}
</script>

<style>
.section {
  /* Add your styles for the sections here */
  /* Initialize the section to be hidden */
  opacity: 0.5;
  transform: translateY(50px);
  transition: opacity 0.5s, transform 0.5s;
}

/* Show the section when the visibility flag is set to true */
.section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>