<template>
	<div>

		<!-- <pre>{{ library }}</pre> -->

		<AppStats v-if="library && library.length" :items="library" :recentlyPlayed="library.recentlyPlayed" />

		<div v-if="library && library.length" class="max-w-xl mx-auto text-center">

			<!-- <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> -->

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
				@update="updateChannel($event)" :item="channelToEdit" :isSaving="isSaving" />
		</AppModalTest>
	</div>
</template>

<script setup>
import { getFirestore, doc, onSnapshot, query, collection } from "firebase/firestore";
import { IconXCircle, IconX, IconAlbum, IconBxAlbum, IconMenu, IconPlus } from "@iconify-prerendered/vue-bx";
import { IconMusicBoxMultiple, IconPlusBoxMultiple, IconMusicNote, IconMusic } from "@iconify-prerendered/vue-mdi";

import { useToast } from 'vue-toastification/dist/index.mjs'
const toast = useToast();
// console.log(useToast)

// const channels = ref([])
const isModalActive = ref(false)
const isSaving = ref(false)
const channelToEdit = ref({})

const channelCount = ref(0)
const stationCount = ref(0)

// const library = ref([])

const { data: library, pending, error, refresh } = await useAsyncData(
	'library',
	() => $fetch('/api/library')
)

const showModal = (val) => {
	// console.log(val)
	channelToEdit.value = val;
	isModalActive.value = !isModalActive.value;
}



const addChannel = async (data) => {
	isSaving.value = true;
	let res = await addDocToFirestore("channels", data);
	isModalActive.value = !isModalActive.value;
	isSaving.value = false;
	console.log(data, res);
	refresh()
	showToast(`${data.name} added`)
}

const deleteChannel = async (id) => {
	isSaving.value = true;
	let res = await deleteDocFromFirestore("channels", id);
	console.log(res)
	isModalActive.value = !isModalActive.value;
	isSaving.value = false;
	refresh()
	// showToast(`${channel.name} upated`)
}

const updateChannel = async (channel) => {
	isSaving.value = true;
	let res = await updateDocInFirestore("channels", channel.uid, channel)
	console.log(res)
	refresh()
	isModalActive.value = !isModalActive.value;
	isSaving.value = false;
	showToast(`${channel.name} upated`)
}

const showToast = (msg) => {
	toast(msg, {
		timeout: 5000,
		bodyClassName: ["font-bold"]
	});
}

onMounted(async () => {
	const db = getFirestore();
	const q = query(collection(db, "channels"));
	let channels = []
	onSnapshot(q, async (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			channels.push(doc.data());
		});
		// console.log("Data: 	Updated", library.value);
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