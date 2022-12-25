<template>
  <form class="p-4 border-2 rounded-lg border-stone-800 bg-stone-900">
    <h2 class="mb-1 text-xl font-bold">{{ title }}</h2>
    <p class="mb-4 text-sm">{{ description }}</p>
    <div class="space-y-2">
      <input
        v-model="input1"
        class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-400 border-stone-600 focus:outline-none focus:shadow-outline bg-stone-700 placeholder-stone-500"
        type="text" :placeholder="placeholder">
      <input
        v-model="input2"
        class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-400 border-stone-600 focus:outline-none focus:shadow-outline bg-stone-700 placeholder-stone-500"
        type="text" :placeholder="placeholder">
      <input
        v-model="input3"
        class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-400 border-stone-600 focus:outline-none focus:shadow-outline bg-stone-700 placeholder-stone-500"
        type="text" :placeholder="placeholder">
    </div>
    <!-- <button class="w-full px-4 py-2 rounded-lg bg-stone-700 hover:bg-gray-800" type="button">Add Another</button> -->
  </form>
</template>

<script setup>
const props = defineProps(["title", "description", "placeholder"])
const emit = defineEmits(["update"])

const input1 = ref("")
const input2 = ref("")
const input3 = ref("")

const onUpdate = () => {
  console.log(inputText.value)
}
</script>