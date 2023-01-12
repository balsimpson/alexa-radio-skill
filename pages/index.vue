<template>
	<div>

		<!-- <pre>{{ library }}</pre> -->

		<AppStats v-if="library && library.length" :items="library" :recentlyPlayed="library.recentlyPlayed" />

		<div v-if="library && library.length" class="max-w-xl mx-auto text-center">


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
					<ChannelCard @edit="showModal($event)" v-for="channel in library" :channel="channel" />
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
import { getFirestore, doc, onSnapshot, query, collection } from "firebase/firestore";
import { IconXCircle, IconX, IconAlbum, IconBxAlbum, IconMenu, IconPlus } from "@iconify-prerendered/vue-bx";
import { IconMusicBoxMultiple, IconPlusBoxMultiple, IconMusicNote, IconMusic } from "@iconify-prerendered/vue-mdi";
// import draggable from 'vuedraggable'
// import { useToast } from "vue-toastification";

import { useToast } from 'vue-toastification/dist/index.mjs'
const toast = useToast();
// console.log(useToast)

// const channels = ref([])
const isModalActive = ref(false)
const channelToEdit = ref({})

const channelCount = ref(0)
const stationCount = ref(0)

// const library = ref([])

const { data: library, pending, error, refresh } = await useAsyncData(
	'library',
	() => $fetch('/api/library')
)

const addChannel = async (data) => {

	let res = await addDocToFirestore("channels", data);
	isModalActive.value = !isModalActive.value;
	console.log(data, res);
	refresh()
	showToast(`${data.name} added`)
}

const showModal = (val) => {
	// console.log(val)
	channelToEdit.value = val;
	isModalActive.value = !isModalActive.value;
}

const deleteChannel = async (id) => {
	let res = await deleteDocFromFirestore("channels", id);
	console.log(res)
	isModalActive.value = !isModalActive.value;
	refresh()
	// showToast(`${channel.name} upated`)
}

const updateChannel = async (channel) => {
	let res = await updateDocInFirestore("channels", channel.uid, channel)
	console.log(res)
	refresh()
	isModalActive.value = !isModalActive.value;
	showToast(`${channel.name} upated`)
}

const showToast = (msg) => {
	toast(msg, {
		timeout: 5000,
		toastClassName: "bg-purple-600",
		bodyClassName: ["font-bold"]
	});
}

onMounted(async () => {
	const db = getFirestore();
	const q = query(collection(db, "channels"));
	let channels  = []
	onSnapshot(q, async (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// library.value.push(doc.data());
			channels.push(doc.data());
		});
		console.log("Data: 	Updated", library.value);
		// await nextTick()
		library.value = channels;
		refresh()
	});
});
</script>

<style>
.Vue-Toastification__toast--default {
	background-color: #582287;
	color: #fff;
}
</style>