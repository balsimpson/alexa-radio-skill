<template>
  <div
    v-if="isActive"
    class="fixed inset-0 z-20 flex items-center justify-center w-screen h-screen bg-black z-80 "
    id="modal"
  >
    <div role="alert" class="relative flex flex-col w-full max-w-xl max-h-full mx-auto overflow-hidden text-current border-none rounded-md shadow-lg outline-none pointer-events-auto bg-stone-900 bg-clip-padding text-stone-400 border-stone-800/70">
      <slot />
    </div>
  </div>
  <!-- <div id="button" class="py-4">
    <button
      class="px-12 py-2 text-base font-medium text-center text-black transition duration-500 ease-in-out transform bg-white border-2 border-black rounded-full hover:bg-transparent hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 "
      @click="modalHandler(true)"
    >
      Contact Me
    </button>
  </div> -->
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>
