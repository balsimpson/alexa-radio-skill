<template>
  <div class="w-full min-h-screen bg-[#EE9A8F] text-stone-300">
    <div class="sticky top-0 z-20 px-4 py-6 sm:px-6 lg:px-8 bg-[#EE9A8F]">
      <nav class="relative flex items-center justify-between max-w-4xl mx-auto "
        aria-label="Global">
        <!-- <IconRadio class="w-12 h-12" /> -->
        <NuxtLink to="/">
          <img src="/favicon.png" alt="" class="w-12">
        </NuxtLink>

        <div class="flex items-center space-x-6">
          <NuxtLink to="/help">
            <IconBxHelpCircle class="w-12 h-12 transition" />
          </NuxtLink>
  
          <NuxtLink to="/settings">
            <IconCog class="w-12 h-12 transition hover:-rotate-12" />
          </NuxtLink>
          
        </div>
        


      </nav>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { IconRadio, IconCog, IconBxHelpCircle } from "@iconify-prerendered/vue-bx";
</script>