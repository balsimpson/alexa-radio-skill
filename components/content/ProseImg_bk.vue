<template>
  <figure v-if="title">
    <img :src="src" :alt="alt" />
    <figcaption>{{ title }}</figcaption>
  </figure>
  <figure v-else>
    <img :src="src" :alt="alt" />
    <figcaption>{{ title }}</figcaption>
  </figure>
  <!-- <img  :src="src" alt=""> -->
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

onMounted(() => {
  // console.log(props)
})
</script>