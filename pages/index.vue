<template>
	<div>
		<!-- <div class="bg-[#EE9A8F] w-full flex items-center justify-center py-12 flex-col sm:flex-row">

			<div class="relative w-1/3 shrink-0">
				<img src="/hero_jukebox.png" alt="">
				<IconMusicNote class="absolute w-12 h-12 delay-300 -top-6 right-4 rotate-6 animate-pulse" />
				<IconMusicNote class="absolute w-12 h-12 delay-150 top-6 left-8 animate-pulse -rotate-12" />
				<IconMusic class="absolute w-12 h-12 -top-4 left-4 -rotate-6 animate-pulse" />
			</div>
			<div class="max-w-sm px-3 text-center sm:text-left">
				<div class="text-5xl font-bold font-arvo text-[#7C3D13]"> <span
						class="mt-8 text-5xl font-semibold tracking-wide text-center text-transparent text-clip bg-gradient-to-br from-[#57B8A3] to-[#094d3e] bg-clip-text">
						Upgrade
					</span> your music game
				</div>
				<p class="text-[#7C3D13] mt-2 font-medium">Easily deploy your own Alexa skill and customize it with your
					favorite streaming
					radio stations.</p>
				<div class="flex items-center justify-center mt-3 space-x-3 sm:justify-start">
					<button @click.prevent="showModal({})"
						class="px-3 py-1 font-semibold border-2 rounded border-[#7C3D13] text-stone-200 bg-[#7C3D13]">Add
						Channel</button>
					<button class="px-3 py-1 font-semibold border-2 rounded border-[#7C3D13] text-[#7C3D13]">Get Started</button>
				</div>
			</div>

		</div> -->

		<AppStats v-if="channels && channels.length" :items="channels"/>

		<div v-if="channels && channels.length" class="max-w-xl mx-auto text-center">

			<div class="flex items-center justify-between px-3 pt-12 pb-6">
				<div class="text-2xl font-bold text-purple-100 font-arvo">Channels
				</div>

				<button @click.prevent="showModal({})"
					class="flex items-center justify-center px-3 py-2 font-semibold transition-colors bg-purple-900 rounded text-stone-200 hover:bg-purple-700">
					<IconPlusBoxMultiple /><span class="ml-3">Add
						Channel</span>
				</button>

			</div>
			<div class="pb-12 text-left">
				<div class="space-y-6">
					<ChannelCard @edit="showModal($event)" v-for="channel in channels" :channel="channel" />
				</div>
			</div>
		</div>

		<div v-else class="flex items-center justify-center py-12 text-center">
			<div>
				<div>Your library is empty.</div>
				<button @click.prevent="showModal({})"
					class="flex items-center justify-center px-3 py-2 mt-12 font-semibold transition-colors bg-purple-900 rounded text-stone-200 hover:bg-purple-700">
					<IconPlus /><span class="ml-3">Add
						Channel</span>
				</button>
			</div>
		</div>

		<AppModalTest :is-active="isModalActive">
			<FormChannel @close="isModalActive = !isModalActive" @delete="deleteChannel" @add="addChannel($event)"
				@update="updateChannel($event)" :item="channelToEdit" />

		</AppModalTest>
	</div>
</template>

<script setup>
import { collection, getFirestore, doc, query, onSnapshot, orderBy } from "firebase/firestore"
import { IconXCircle, IconX, IconAlbum, IconBxAlbum, IconMenu, IconPlus } from "@iconify-prerendered/vue-bx";
import { IconMusicBoxMultiple, IconPlusBoxMultiple, IconMusicNote, IconMusic } from "@iconify-prerendered/vue-mdi";
import draggable from 'vuedraggable'
// import useToast from "vue-toastification";
// const toast = useToast();

const channels = ref([])
const isModalActive = ref(false)
const channelToEdit = ref({})

const channelCount = ref(0)
const stationCount = ref(0)

const addChannel = async (data) => {

	let res = await addDocToFirestore("channels", data);
	isModalActive.value = !isModalActive.value;
	console.log(data, res);
}

const showModal = (val) => {
	// console.log(val)
	channelToEdit.value = val;
	isModalActive.value = !isModalActive.value;
}

const deleteChannel = async (id) => {
	let res = await deleteDocFromFirestore("channels", id);
	console.log(res)
}

const updateChannel = async (channel) => {
	let res = await updateDocInFirestore("channels", channel.uid, channel)
	console.log(res)
}

const showToast = () => {
	toast.error(`Deleted channel`, {
		timeout: 5000
	});
}

onMounted(async () => {
	// channels.value = await watchDb("channels")
	const db = getFirestore();
	const q = query(collection(db, "channels"));
	const subscribe = onSnapshot(q, (querySnapshot) => {

		const items = []

		querySnapshot.forEach((doc) => {
			let data = doc.data();
			// @ts-ignore
			// console.log("data", data)
			data.uid = doc.id;
			items.push(data);
		});

		// return items
		channels.value = items;

		let allStations = []

		channels.value.map((channel) => {
			let channelName = channel.name
			channel.stations.map(station => {
				station.channel = channelName
				allStations.push(station)
			})
		})

		channelCount.value = items.length
		stationCount.value = allStations.length
	});
	// channels.value = await getDocsFromFirestore("channels")
})
</script>


