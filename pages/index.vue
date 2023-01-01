<template>
	<div>

		<AppStats v-if="library && library.channels && library.channels.length && !pending" :items="library.channels" :recentlyPlayed="library.recentlyPlayed"/>

		<div v-if="library && library.channels && library.channels.length" class="max-w-xl mx-auto text-center">

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
					<ChannelCard @edit="showModal($event)" v-for="channel in library.channels" :channel="channel" />
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
	isModalActive.value = !isModalActive.value;
	refresh()
	showToast(`${channel.name} upated`)
}

const showToast = (msg) => {
	toast(msg, {
		timeout: 50000,
		toastClassName: "bg-purple-600",
		bodyClassName: ["font-bold"]
	});
}
</script>

<style>
.Vue-Toastification__toast--default {
    background-color: #582287;
    color: #fff;
}
</style>