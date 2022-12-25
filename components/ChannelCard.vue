<template>
  <div class="p-3 border rounded bg-stone-900 border-stone-800/70">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <IconMusicBoxMultiple class="w-6 h-6 text-cyan-300 opacity-30" />
        <div class="ml-2 text-2xl font-bold text-gray-400">{{ channel.name }}</div>
      </div>

      <button @click.prevent="showModal(channel)" class="opacity-40 hover:opacity-100">
        <svg class="w-4 h-4 text-gray-400 transition-colors fill-current" viewBox="0 0 24 24">
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
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
import { IconMusicBoxMultiple, IconMusicNote, IconMusic } from "@iconify-prerendered/vue-mdi";
  const props = defineProps(["channel"])
</script>