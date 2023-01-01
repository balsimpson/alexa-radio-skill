<template>
  <!-- Features -->
  <div class="max-w-xl px-3 py-10 mx-auto ">
    <!-- Grid -->
    <div class="flex flex-wrap items-end justify-center gap-6 sm:gap-12 lg:gap-8">
      <!-- Stats -->
      <div class="text-center">
        <p class="mt-2 text-4xl font-bold item text-violet-400 sm:mt-3 sm:text-6xl" ref="el1">{{ channelCount }}</p>
        <h4 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Channels</h4>
        <!-- <p class="mt-1 text-gray-500">in fulfilling orders</p> -->
      </div>
      <!-- End Stats -->

      <!-- Stats -->
      <div class="text-center">
        <p class="mt-2 text-4xl font-bold text-violet-400 sm:mt-3 sm:text-6xl item" ref="el2">{{ stationCount }}</p>
        <h4 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Stations</h4>
        <!-- <p class="mt-1 text-gray-500">partner with Preline</p> -->
      </div>
      <!-- End Stats -->

      <!-- Stats -->
      <!-- End Stats -->
    </div>
    <div v-if="recentlyPlayed" class="flex justify-center p-3 py-6 mt-6 text-center border-t border-b border-stone-800 animate-fadeIn">
      <div>
        <h4 class="font-semibold text-gray-800 dark:text-gray-200">Recently Played</h4>
        <p class="text-lg font-bold text-violet-400 sm:mt-3 sm:text-xl">{{ recentlyPlayed.name }}</p>
        <p class="text-gray-500 ">{{ recentlyPlayed.channel }}</p>
      </div>
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Features -->
</template>

<script setup>
const props = defineProps(["items", "recentlyPlayed"])
const channelCount = ref(0)
const stationCount = ref(0)

const el1 = ref()
const el2 = ref()

onMounted(() => {
  observeElements([el1.value, el2.value]);

  let allStations = []

  // console.log(props.items)
  props.items.map((channel) => {
    let channelName = channel.name
    channel.stations.map(station => {
      station.channel = channelName
      allStations.push(station)
    })
  })

  channelCount.value = props.items.length
  stationCount.value = allStations.length
})
</script>

<style>
.item {
  /* Add your styles for the items here */
  /* Initialize the item to be hidden */
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.5s, transform 0.5s;
}

/* Show the item when the visibility flag is set to true */
.item.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInTop {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>