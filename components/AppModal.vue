<template>
  <div v-if="isActive"
    class="fixed top-0 bottom-0 left-0 z-40 flex items-center w-full h-full p-6 py-12 overflow-x-hidden overflow-y-auto outline-none bg-black/90"
    tabindex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
    <!-- <div class="relative w-auto max-w-lg mx-auto pointer-events-none ">
    </div> -->
    <div
      class="relative flex flex-col w-full max-w-xl max-h-full mx-auto overflow-hidden text-current border-none rounded-md shadow-lg outline-none pointer-events-auto bg-stone-800 text-stone-400">
      <div class="flex items-start justify-between flex-shrink-0 p-4 border-b border-stone-700 rounded-t-md">
        <div class="">
          <pre>{{ item }}</pre>
          <h3 class="text-2xl font-bold text-cyan-600 dark:text-cyan-500">
            Add a channel
          </h3>
          <p class="mt-1 text-sm text-stone-400">
            A channel is a collection of stations.
          </p>
        </div>
        <button @click.prevent="emit('close')" type="button"
          class="border-none rounded-none opacity-50 text-stone-500 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-stone-200 hover:opacity-75 hover:no-underline"
          aria-label="Close">
          <IconX />
        </button>
      </div>
      <div class="relative flex-auto p-2 overflow-y-auto">

        <div class="p-3">
          <label class="block mb-1 text-sm font-bold" for="name">
            What is the name of your Channel?
          </label>
          <input
            class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-200 border-stone-500 focus:outline-none focus:shadow-outline bg-stone-600"
            type="text" placeholder="Enter channel name" v-model="channelName" />
        </div>

        <div class="p-2 px-3 mt-3 border-t border-stone-600">
          <h3 class="text-xl font-bold text-cyan-600 dark:text-cyan-500">
            Add a station
          </h3>
          <p class="text-sm ">
            You can add as many stations as you want to a channel.
          </p>
          <div class="mt-4">
            <label class="block mb-1 text-sm font-bold" for="name">
              What is the name of the Station?
            </label>
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-200 border-stone-500 focus:outline-none focus:shadow-outline bg-stone-600"
              type="text" placeholder="Enter station name" v-model="stationName" />
          </div>
          <div class="mt-2">
            <label class="block mb-1 text-sm font-bold" for="name">
              What is the URL of the Station?
            </label>
            <input
              class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-200 border-stone-500 focus:outline-none focus:shadow-outline bg-stone-600"
              type="url" placeholder="Enter station URL" v-model="stationURL" />
          </div>
          <button @click.prevent="addStation(stationName, stationURL)"
            class="px-3 py-1 mt-2 text-xs font-bold border rounded-full text-cyan-600 border-cyan-800 hover:border-cyan-400 active:border-cyan-400">Add
            Station</button>
        </div>


        <div class="p-4 mt-4 border-t border-stone-600">
          <h3 class="text-lg font-bold text-cyan-600 ">
            Stations <span class="px-2 ml-2 text-white rounded bg-cyan-600">{{ addedStations?.length }}</span>
          </h3>
          <div v-if="addedStations?.length > 0">
            <draggable tag="ul" :list="addedStations" class="space-y-2 list-group" handle=".handle" item-key="order">
              <template #item="{ element, index }">
                <div class="w-full p-2 text-white rounded bg-cyan-800">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xl font-semibold tracking-wide break-words">{{ element.name }}</div>
                      <div class="w-full text-sm break-words">{{ element.url }}</div>
                    </div>

                    <div class="shrink-0">
                      <IconXCircle @click.prevent="deleteStation(element.url)" />
                      <IconMenu class="cursor-pointer handle" />
                    </div>
                  </div>
                </div>
              </template>
            </draggable>

          </div>
          <div v-else>No Stations Added</div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-end flex-shrink-0 p-4 space-y-2 border-t border-stone-700 rounded-b-md">
        <button type="button"
          class="sm:inline-block px-6 py-2.5 border border-stone-600 text-stone-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-stone-700 hover:shadow-lg focus:bg-stone-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-stone-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-bs-dismiss="modal">
          Cancel
        </button>
        <button @click="saveChannel" type="button"
          class="sm:inline-block w-full px-6 py-2.5 bg-cyan-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out"
          :class="[(channelName && addedStations.length > 0) ? 'opacity-100' : 'opacity-50 pointer-events-none']">
          Save changes
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>

import draggable from 'vuedraggable'
import { IconXCircle, IconX, IconMenu } from "@iconify-prerendered/vue-bx";

const props = defineProps(["isActive", "item"])
const emit = defineEmits(["save", "close"])

const drag = ref(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "group",
    disabled: false,
    ghostClass: "ghost"
  };
})

const channelName = ref(props.item.name || "")
const addedStations = ref(props.item.stations || []);
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

onMounted(() => {
  // console.log("mounted modal", props.item)
  // addedStations.value = props.item.stations || [];
  // channelName.value = props.item.name || "";
  // if (props.item && props.item.stations) {
  // } 
  // else {
  //   channelName.value = "";
  //   addedStations.value = [];
  // }
})

onUnmounted(() => {
  console.log("unmounted")
})
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>