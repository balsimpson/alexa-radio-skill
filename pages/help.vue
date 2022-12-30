<!-- <template>
  <main class="w-full mx-auto prose prose-invert">
    <ContentDoc />
  </main>
</template>

<script setup>

</script> -->

<template>
  <ContentRenderer :value="data" class="w-full mx-auto prose prose-invert"/>
</template>
<script setup lang="ts">
const { data } = await useAsyncData('help', () => queryContent('/help').findOne())
</script>