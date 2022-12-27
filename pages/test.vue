<template>
  <div class="space-y-4 landing-page">
    <section class="px-4 py-16 text-gray-700 bg-gray-300 section section-1" ref="section1">
      <!-- Section 1 content goes here -->
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, consequuntur corrupti tenetur pariatur perferendis molestiae dignissimos non dicta ad dolorum!

      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </section>
    <section class="px-4 py-16 text-gray-700 bg-gray-300 section section-1" ref="section2">
      <!-- Section 1 content goes here -->
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, consequuntur corrupti tenetur pariatur perferendis molestiae dignissimos non dicta ad dolorum!

      <br><br><br><br><br><br><br><br><br><br><br><br><br>
    </section>
    <section class="px-4 py-16 text-gray-700 bg-gray-300 section section-1" ref="section3">
      <!-- Section 1 content goes here -->
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, consequuntur corrupti tenetur pariatur perferendis molestiae dignissimos non dicta ad dolorum!

      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </section>

  </div>
</template>

<script setup>
const section1 = ref()
const section2 = ref()
const section3 = ref()

onMounted(() => {
  observeElements([section1.value, section2.value, section3.value]);
})
</script>

<style>
.section {
  /* Add your styles for the sections here */
  /* Initialize the section to be hidden */
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.5s, transform 0.5s;
}

/* Show the section when the visibility flag is set to true */
.section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>