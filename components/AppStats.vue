<template>
  <!-- Features -->
  <div class="max-w-xl px-3 py-10 mx-auto ">
    <!-- Grid -->
    <div class="flex flex-wrap items-end justify-center gap-6 sm:gap-12 lg:gap-8">
      <!-- Stats -->
      <div class="text-center">
        <p class="mt-2 text-4xl font-bold text-violet-400 sm:mt-3 sm:text-6xl">{{ channelCount }}</p>
        <h4 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Channels</h4>
        <!-- <p class="mt-1 text-gray-500">in fulfilling orders</p> -->
      </div>
      <!-- End Stats -->

      <!-- Stats -->
      <div class="text-center">
        <p class="mt-2 text-4xl font-bold text-violet-400 sm:mt-3 sm:text-6xl">{{ stationCount }}</p>
        <h4 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Stations</h4>
        <!-- <p class="mt-1 text-gray-500">partner with Preline</p> -->
      </div>
      <!-- End Stats -->

      <!-- Stats -->
      <!-- End Stats -->
    </div>
    <div class="flex justify-center p-3 py-6 mt-6 text-center border-t border-b border-stone-800">
      <div>
        <h4 class="font-semibold text-gray-800 dark:text-gray-200">Recently Played</h4>
        <p class="text-lg font-bold text-violet-400 sm:mt-3 sm:text-xl">Lord Of The Rings: Lord Of The Rings</p>
        <p class="text-gray-500 ">A Long Party</p>
      </div>
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Features -->
</template>

<script setup>
const props = defineProps(["items"])
const channelCount = ref(0)
const stationCount = ref(0)
onMounted(() => {
  let allStations = []

  console.log(props.items)
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