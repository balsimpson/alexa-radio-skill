<template>
  <div v-if="isActive"
    class="fixed inset-0 z-40 w-full h-full p-6 py-12 overflow-x-hidden overflow-y-auto bg-black outline-none"
    tabindex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
    <!-- <div class="relative w-auto max-w-lg mx-auto pointer-events-none ">
    </div> -->
    <div
      class="relative flex flex-col w-full max-w-xl max-h-full mx-auto overflow-hidden text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto bg-clip-padding">
      <div class="flex justify-between flex-shrink-0 p-4 border-b border-gray-200 rounded-t-md">
        <div class="">
          <h3 class="text-2xl font-bold text-cyan-600 dark:text-cyan-500">
            Add a channel
          </h3>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-500">
            A channel is a collection of stations.
          </p>
        </div>
        <button @click.prevent="emit('close')" type="button"
          class="text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          aria-label="Close">
          <IconX />
        </button>
      </div>
      <div class="relative flex-auto p-6 overflow-y-auto">

        <div class="">
          <label class="block mb-1 text-sm font-bold text-gray-700" for="name">
            What is the name of your Channel?
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text" placeholder="Enter channel name" v-model="channelName" />
        </div>

        <div class="p-2 mt-4 border">
          <h3 class="text-xl font-bold text-cyan-600 dark:text-cyan-500">
            Add a station
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-500">
            You can add as many stations as you want to a channel.
          </p>
          <div class="mt-4">
            <label class="block mb-1 text-sm font-bold text-gray-700" for="name">
              What is the name of the Station?
            </label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text" placeholder="Enter station name" v-model="stationName" />
          </div>
          <div class="mt-2">
            <label class="block mb-1 text-sm font-bold text-gray-700" for="name">
              What is the URL of the Station?
            </label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="url" placeholder="Enter station URL" v-model="stationURL" />
          </div>
          <button @click.prevent="addStation(stationName, stationURL)"
            class="px-3 py-1 mt-1 text-xs font-bold border rounded-full text-cyan-600 border-cyan-800 hover:border-cyan-400 active:border-cyan-400">Add Station</button>
        </div>


        <div class="p-4 mt-4 border">
          <h3 class="text-lg font-bold text-cyan-600 dark:text-cyan-500">
            Added stations
          </h3>
          <div v-if="addedStations.length > 0" class="space-y-2">
            <div v-for="station in addedStations"
              class="flex items-center justify-between p-2 text-white bg-gray-600 rounded">
              <div class="w-5/6 ">
                <div class="text-xl font-semibold tracking-wide break-words">{{ station.name }}</div>
                <div class="text-sm break-words">{{ station.url }}</div>
              </div>
              <IconXCircle @click.prevent="deleteStation( station.url)" class="cursor-pointer"/>
            </div>
          </div>

          <div v-else>No Stations Added</div>
        </div>


      </div>
      <div
        class="flex flex-wrap items-center justify-end flex-shrink-0 p-4 space-y-2 border-t border-gray-200 rounded-b-md">
        <button type="button"
          class="sm:inline-block px-6 py-2.5 border border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-bs-dismiss="modal">
          Cancel
        </button>
        <button @click="saveChannel" type="button"
          class="sm:inline-block w-full px-6 py-2.5 bg-cyan-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out"
          :class="[(channelName && addedStations.length > 0) ? 'opacity-100': 'opacity-50 pointer-events-none']"
          >
          Save changes
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { IconXCircle, IconX } from "@iconify-prerendered/vue-bx";

const emit = defineEmits(["save", "close"])
const props = defineProps(["isActive"])

const channelName = ref("")
const addedStations = ref([]);
const stationName = ref("")
const stationURL = ref("")

const addStation = (name, url) => {
  if (!name || !url) {
    return
  }
  addedStations.value.push({
    name: name,
    url: url
  });
  stationName.value = "";
  stationURL.value = "";
}

const deleteStation = (val) => {
  addedStations.value = addedStations.value.filter((station) => station.url != val);
}

const saveChannel = () => {
  let channel = {
    name: channelName.value,
    stations: addedStations.value
  }

  emit("save", channel)
}
</script>