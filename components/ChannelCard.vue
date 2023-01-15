<template>
  <div class="p-3 border rounded bg-stone-900 border-stone-800/70 section" ref="el">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="mr-2 text-2xl font-bold text-gray-400">{{ channel.name }}

        </div>
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
        <div class="flex flex-col items-start w-full sm:flex-row">
          <div class="flex items-center text-xl font-semibold tracking-wide text-gray-400 break-words">{{
            station.name
          }}
          </div>
          <div v-if="station.offset && station.offset > 0"
            class="inline-flex items-center justify-center px-3 py-1 text-xs text-indigo-500 border border-indigo-500 rounded-full sm:ml-3">
            <!-- <IconHeadphones class="text-white/40"/> -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4 text-white/40">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            <span class="ml-1">{{ convertOffsetToDuration(station.offset) }}</span>
          </div>

          <!-- <pre>{{ station }}</pre> -->
        </div>
        <div class="text-sm text-gray-600 break-words">{{ station.url }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconMusicBoxMultiple, IconEditBoxOutline, IconShuffleVariant, IconHeadphones } from "@iconify-prerendered/vue-mdi";
const props = defineProps(["channel"])
const emit = defineEmits(["edit"])

const el = ref()

onMounted(async () => {
  observeElements([el.value]);
  // let res = await getDocsFromFirestore("library")
  // console.log(res);
})

const convertOffsetToDuration = (milliseconds) => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  let duration = "";
  if (hours > 0) {
    duration += `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    duration += `${duration ? ", " : ""}${minutes} min${minutes > 1 ? "s" : ""}`;
  }
  if (seconds > 0) {
    duration += `${duration ? ", " : ""}${seconds} sec${seconds > 1 ? "s" : ""}`;
  }
  return duration;
}
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