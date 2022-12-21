<template>
  <div class="max-w-2xl px-2 mx-auto ">
    <ContentRenderer :value="data" class="prose "/>
  </div>
</template>

<script setup>
const { data } = await useAsyncData('help', () => queryContent('/getting-started').findOne())
</script>