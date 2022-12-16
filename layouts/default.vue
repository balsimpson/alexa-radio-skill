<template>
  <div class="w-full min-h-screen dark:bg-stone-900">
    <div class="relative px-4 py-6 sm:px-6 lg:px-8">
      <nav class="relative flex items-center justify-between max-w-4xl mx-auto "
        aria-label="Global">
        <IconRadio class="w-12 h-12" />

        <IconCog class="w-12 h-12" />


      </nav>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { IconRadio, IconCog } from "@iconify-prerendered/vue-bx";
</script>