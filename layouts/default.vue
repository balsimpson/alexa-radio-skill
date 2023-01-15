<template>
  <div class="w-full min-h-screen text-stone-300">
    <div class="px-4 py-6 sm:px-6 lg:px-8 ">
      <nav class="relative flex items-center justify-between max-w-4xl mx-auto " aria-label="Global">
        <NuxtLink to="/">
          <img src="/favicon.png" alt="" class="w-12">
        </NuxtLink>
        <div class="flex items-center space-x-6 text-purple-700/70">
          <NuxtLink to="/help">
            <IconBxHelpCircle class="w-12 h-12 transition hover:text-purple-600" />
          </NuxtLink>
          <NuxtLink to="/settings">
            <IconCog class="w-12 h-12 transition hover:-rotate-12 hover:text-purple-600" />
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

<style>
body {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
  radial-gradient(84% 847% at 14% 14%, #15131f 0%, rgba(22, 20, 33, 0) 100%),
  radial-gradient(40% 82% at 50% 50%, rgba(21, 19, 31, 0.74) 0%, rgba(21, 19, 31, 0.74) 100%),
  radial-gradient(82% 26% at 34% 10%, #15131f 0%, rgba(130, 171, 199, 0.91) 46%, #8968ff 72%, #15131f 90%)
}
</style>