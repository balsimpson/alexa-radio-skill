<template>
  <div class="p-3 border rounded bg-stone-900 border-stone-800/70 section" ref="el">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="mr-2 text-2xl font-bold text-gray-400">{{ channel.name }}</div>
        <IconShuffleVariant v-if="channel.shuffle" class="w-6 h-6 text-purple-300 opacity-30" />
      </div>

      <button @click.prevent="emit('edit', channel)" class="opacity-40 hover:opacity-100">
        <!-- <svg class="w-4 h-4 text-purple-400 transition-colors fill-current" viewBox="0 0 24 24">
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg> -->
        <IconEditBoxOutline class="w-6 h-6" />
      </button>
    </div>
    <div class="mt-2 space-y-2">
      <div v-for="station in channel.stations" class="w-full p-3 rounded bg-stone-800/80 ">
        <div class="text-xl font-semibold tracking-wide text-gray-400 break-words">{{ station.name }}</div>
        <div class="text-sm text-gray-500 break-words">{{ station.url }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconMusicBoxMultiple, IconEditBoxOutline, IconShuffle, IconShuffleVariant } from "@iconify-prerendered/vue-mdi";
const props = defineProps(["channel"])
const emit = defineEmits(["edit"])

const el = ref()

onMounted(async () => {
  observeElements([el.value]);
  // let res = await getDocsFromFirestore("library")
  // console.log(res);
})
</script>


<style>
.section {
  /* Add your styles for the sections here */
  /* Initialize the section to be hidden */
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.5s, transform 0.5s;
}

/* Show the section when the visibility flag is set to true */
.section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>