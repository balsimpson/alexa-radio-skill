<template>
  <div class="w-full min-h-screen bg-stone-900 text-stone-300">
    <div class="relative px-4 py-6 sm:px-6 lg:px-8">
      <nav class="relative flex items-center justify-between max-w-4xl mx-auto "
        aria-label="Global">
        <!-- <IconRadio class="w-12 h-12" /> -->
        <img src="/favicon.png" alt="" class="w-12">

        <div class="flex items-center space-x-6">
          <IconBxHelpCircle class="w-12 h-12 transition" />
        <IconCog class="w-12 h-12 transition hover:rotate-45" />
        </div>


      </nav>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { IconRadio, IconCog, IconBxHelpCircle } from "@iconify-prerendered/vue-bx";
</script>