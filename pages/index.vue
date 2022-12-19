<template>
	<div class="max-w-xl mx-auto ">
		<div class="px-4 mt-12 text-sm text-center font-arvo">
			Alexa Audio Player supports AAC/MP4, MP3, HLS, PLS and M3U audio streams ranging from 16kbps to 384kbps.
			Make sure the stream URL starts with https
		</div>

		<div class="mt-6 text-center">
			<button @click="showModal({})" class="px-3 py-1 font-bold text-black rounded bg-amber-600">
				Add Channel
			</button>

		</div>

		<div v-if="channels" class="py-12">
			<div class="px-4 space-y-3">
				<div v-for="channel in channels" class="p-2 border rounded bg-stone-800 border-stone-700">
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<IconBxAlbum />
							<div class="ml-2 text-2xl font-bold">{{ channel.name }}</div>
						</div>

						<div @click.prevent="showModal(channel)" class="cursor-pointer">Edit</div>
					</div>
					<div class="mt-2 space-y-2">
						<div v-for="station in channel.stations" class="w-full p-2 text-white rounded bg-stone-700">
							<div class="text-xl font-semibold tracking-wide break-words">{{ station.name }}</div>
							<div class="text-sm break-words">{{ station.url }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<AppModalTest :isActive="isModalActive" :item="channelToEdit">
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
					<button @click.prevent="isModalActive = !isModalActive" type="button"
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
							type="text" placeholder="Enter channel name" v-model="channelToEdit.name" />
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
							Stations <span class="px-2 ml-2 text-white rounded bg-cyan-600">{{ channelToEdit?.stations?.length }}</span>
						</h3>
						<div v-if="channelToEdit && channelToEdit.stations?.length > 0">
							<draggable tag="ul" :list="channelToEdit.stations" class="space-y-2 list-group" handle=".handle" item-key="order">
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
						:class="[(channelToEdit.name && channelToEdit.stations.length > 0) ? 'opacity-100' : 'opacity-50 pointer-events-none']">
						Save changes
					</button>

				</div>
			</div>
		</AppModalTest>

	</div>
</template>

<script setup>
import { IconXCircle, IconX, IconAlbum, IconBxAlbum, IconMenu } from "@iconify-prerendered/vue-bx";
import draggable from 'vuedraggable'
const channels = ref([])
const isModalActive = ref(false)
const channelToEdit = ref({})

const stationName = ref("")
const stationURL = ref("")

const saveChannel = async (data) => {
	let res = await addDocToFirestore("channels", data);
	isModalActive.value = !isModalActive
	console.log(data, res);
}

const showModal = (val) => {
	console.log(val)
	channelToEdit.value = val;
	isModalActive.value = !isModalActive.value;
}

onMounted(async () => {
	channels.value = await getDocsFromFirestore("channels")
})
</script>

