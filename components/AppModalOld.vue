<template>
  <div v-if="isActive"
    class="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-white z-80 sm:bg-stone-700/90" id="modal">
    <div role="alert" class="container relative mx-auto sm:max-w-2xl sm:w-11/12">
      <slot />
      <!-- close button -->
      <div
        class="absolute transition duration-150 ease-in-out cursor-pointer top-2 right-2 text-stone-500 hover:text-teal-600 "
        @click="emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" class="icon icon-tabler icon-tabler-x" width="20"
          height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
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

const emit = defineEmits(["close"]);


</script>
