<!-- <template>
  <main class="w-full mx-auto prose prose-invert">
    <ContentDoc />
  </main>
</template>

<script setup>

</script> -->

<template>
  <ContentRenderer :value="data" class="w-full px-4 mx-auto prose prose-invert"/>
</template>
<script setup lang="ts">
const { data } = await useAsyncData('help', () => queryContent('/help').findOne())
</script>

<style>
.prose :where(h2):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 700;
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.3333333;
}
</style>