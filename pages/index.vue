<template>
	<div>

		<AppStats v-if="channels && channels.length && !pending" :items="channels"/>

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

// const channels = ref([])
const isModalActive = ref(false)
const channelToEdit = ref({})

const channelCount = ref(0)
const stationCount = ref(0)


const { data: channels, pending, error, refresh } = await useAsyncData(
  'items',
  () => $fetch('/api/library')
)

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
	// const db = getFirestore();
	// const q = query(collection(db, "channels"));
	// const subscribe = onSnapshot(q, (querySnapshot) => {

	// 	const items = []

	// 	querySnapshot.forEach((doc) => {
	// 		let data = doc.data();
	// 		// @ts-ignore
	// 		// console.log("data", data)
	// 		data.uid = doc.id;
	// 		items.push(data);
	// 	});

	// 	// return items
	// 	channels.value = items;

	// 	let allStations = []

	// 	channels.value.map((channel) => {
	// 		let channelName = channel.name
	// 		channel.stations.map(station => {
	// 			station.channel = channelName
	// 			allStations.push(station)
	// 		})
	// 	})

	// 	channelCount.value = items.length
	// 	stationCount.value = allStations.length
	// });
	// channels.value = await getDocsFromFirestore("channels")
})
</script>


