<template>
  <div
    class="relative flex flex-col w-full max-w-xl max-h-full mx-auto overflow-hidden text-current border-none rounded-md shadow-lg outline-none pointer-events-auto bg-stone-900/80 text-stone-400">
    <div
      class="flex items-start justify-between flex-shrink-0 p-4 border-b border-stone-700/80 rounded-t-md text-stone-400">
      <div class="">
        <!-- <pre>{{ item }}</pre> -->
        <h3 class="text-2xl font-bold text-stone-400">
          {{ item.uid ? "Edit channel" : "Add a channel" }}
        </h3>
        <p class="mt-1 text-sm ">
          A channel is a collection of stations.
        </p>
      </div>
      <button @click.prevent="emit('close')" type="button"
        class="border-none rounded-none opacity-50 text-stone-500 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-stone-200 hover:opacity-75 hover:no-underline"
        aria-label="Close">
        <IconX />
      </button>
    </div>
    <div class="relative flex-auto p-2 overflow-y-auto text-gray-400">

      <div class="p-3">
        <label class="block mb-1 text-sm font-bold" for="name">
          What is the name of your Channel?
        </label>
        <input
          @keypress.enter="addStation(stationName, stationURL)"
          class="w-full px-3 py-2 leading-tight text-gray-400 border rounded shadow appearance-none border-stone-600 focus:outline-none focus:shadow-outline bg-stone-700 placeholder-stone-500"
          type="text" placeholder="Enter channel name" v-model="item.name" />
      </div>

      <div class="p-2 px-3 mt-3 border-t border-stone-600">
        <h3 class="flex items-center text-xl font-bold">
          <IconAddToQueue />
          <span class="ml-3">Add a station</span>
        </h3>
        <p class="text-sm ">
          You can add as many stations as you want to a channel.
        </p>
        <div class="mt-4">
          <label class="block mb-1 text-sm font-bold" for="name">
            What is the name of the Station?
          </label>
          <input
            @keypress.enter="addStation(stationName, stationURL)"
            class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-400 border-stone-600 focus:outline-none focus:shadow-outline bg-stone-700 placeholder-stone-500"
            type="text" placeholder="Enter station name" v-model="stationName" />
        </div>
        <div class="mt-2">
          <label class="block mb-1 text-sm font-bold" for="name">
            What is the URL of the Station?
          </label>
          <input
          @keypress.enter="addStation(stationName, stationURL)"
            class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-stone-400 border-stone-600 focus:outline-none focus:shadow-outline bg-stone-700 placeholder-stone-500"
            type="url" placeholder="Enter station URL" v-model="stationURL" />
        </div>
        <button @click.prevent="addStation(stationName, stationURL)"
          class="px-3 py-1 mt-2 text-xs font-bold border rounded-full text-cyan-700 border-cyan-700 hover:border-cyan-700 active:border-cyan-700 hover:text-cyan-700"
          :class="[(stationName && stationURL) ? 'opacity-100' : 'opacity-50 pointer-events-none']">Add Station</button>
      </div>


      <div class="p-4 mt-4 border-t border-stone-600">
        <h3 class="text-lg font-bold text-gray-500 ">
          Stations <span v-if="addedStations?.length > 0" class="px-2 ml-2 text-white rounded bg-cyan-800 ">{{
              addedStations?.length
          }}</span>
        </h3>
        <div v-if="item && addedStations?.length > 0">
          <draggable tag="ul" :list="addedStations" class="space-y-2 list-group" handle=".handle" item-key="order">
            <template #item="{ element, index }">
              <div class="w-full p-2 text-gray-400 border rounded border-stone-700/40 bg-stone-800/80">
                <div class="flex items-center justify-between h-full">
                  <div class="w-10/12 shrink-0">
                    <div class="text-xl font-semibold tracking-wide break-words">{{ element.name }}</div>
                    <div class="w-full text-sm break-words">{{ element.url }}</div>
                  </div>

                  <div class="flex flex-col justify-between space-y-1 shrink-0">
                    <IconXCircle @click.prevent="deleteStation(element.url)" class="hover:text-red-500"/>
                    <IconMenu class="cursor-pointer handle hover:text-cyan-600" />
                  </div>
                </div>
              </div>
            </template>
          </draggable>

        </div>
        <div v-else>
          <div class="flex mt-3 space-x-3">
            <IconInfoSquare />
            <div>No Stations Added</div>
          </div>
          <p class="text-sm italic">Use the form above to add a station.</p>
        </div>
      </div>
    </div>

    <div
      class="flex flex-wrap items-center justify-center flex-shrink-0 p-4 space-y-2 border-t border-stone-700 rounded-b-md">
      <div class="flex justify-between w-full">
        <button v-if="item.uid" @click="deleteChannel(item.uid)"
          class="sm:inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out">delete
          channel</button>
        <ToggleSwitch @toggled="isShuffleOn = !isShuffleOn" checked="Shuffle ON" unchecked="Shuffle OFF"
          :status="isShuffleOn" />
      </div>
      <button @click.prevent="emit('close')" type="button"
        class="sm:inline-block px-6 py-2.5 border border-stone-600 text-stone-500 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-stone-700 hover:text-stone-400 hover:shadow-lg focus:bg-stone-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-stone-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-bs-dismiss="modal">
        Cancel
      </button>
      <button v-if="item.uid" @click="updateChannel(item)" type="button"
        class="sm:inline-block w-full px-6 py-2.5 bg-teal-600 text-white font-semibold text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out"
        :class="[(item.name && item.stations?.length > 0) ? 'opacity-100' : 'opacity-50 pointer-events-none']">
        {{ item.uid ? 'Update Channel' : 'Add Channel' }}
      </button>
      <button v-else @click="addChannel(item)" type="button"
        class="sm:inline-block w-full px-6 py-2.5 bg-cyan-600 text-white font-semibold text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out"
        :class="[(item.name && addedStations?.length > 0) ? 'opacity-100' : 'opacity-50 pointer-events-none']">
        {{ item.uid ? 'Update Channel' : 'Add Channel' }}
      </button>

    </div>
  </div>
</template>

<script setup>
import { IconXCircle, IconX, IconAlbum, IconBxAlbum, IconMenu, IconInfoSquare, IconAddToQueue } from "@iconify-prerendered/vue-bx";
import draggable from 'vuedraggable'

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

const emit = defineEmits([
  "add",
  "update",
  "delete",
  "close",
]);

const stationName = ref("")
const stationURL = ref("")
const addedStations = ref(props.item.stations || [])
const isShuffleOn = ref(props.item.shuffle || false)

const addChannel = (channel) => {
  const data = {
    name: channel.name,
    stations: addedStations.value,
    shuffle: isShuffleOn.value
  }

  emit("add", data)
}

const updateChannel = (channel) => {
  const data = {
    uid: channel.uid,
    name: channel.name,
    stations: addedStations.value,
    shuffle: isShuffleOn.value
  }

  emit("update", data)
  // console.log('data', data)
}

const deleteChannel = (uid) => {
  emit("delete", uid)
}

const addStation = (name, url) => {
  if (!name || !url) return
  stationName.value = ""
  stationURL.value = ""
  addedStations.value.push({ name, url })
}


const deleteStation = (val) => {
  addedStations.value = addedStations.value.filter((station) => station.url != val);
}

function modalHandler() {
  emit("close");
}



</script>