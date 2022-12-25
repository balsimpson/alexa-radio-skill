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

		<!-- Features -->
		<div class="max-w-xl px-3 py-10 mx-auto ">
			<!-- Grid -->
			<div class="flex flex-wrap items-end justify-center gap-6 sm:gap-12 lg:gap-8">
				<!-- Stats -->
				<div class="text-center">
					<p class="mt-2 text-4xl font-bold text-violet-400 sm:mt-3 sm:text-6xl">4</p>
					<h4 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Channels</h4>
					<!-- <p class="mt-1 text-gray-500">in fulfilling orders</p> -->
				</div>
				<!-- End Stats -->

				<!-- Stats -->
				<div class="text-center">
					<p class="mt-2 text-4xl font-bold text-violet-400 sm:mt-3 sm:text-6xl">16</p>
					<h4 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">Stations</h4>
					<!-- <p class="mt-1 text-gray-500">partner with Preline</p> -->
				</div>
				<!-- End Stats -->

				<!-- Stats -->
				<!-- End Stats -->
			</div>
			<div class="flex justify-center p-3 py-6 mt-6 text-center border rounded-lg border-stone-800">
				<div>
					<h4 class="font-semibold text-gray-800 dark:text-gray-200">Recently Played</h4>
					<p class="text-lg font-bold text-violet-400 sm:mt-3 sm:text-xl">Lord Of The Rings: Lord Of The Rings</p>
					<p class="text-gray-500 ">A Long Party</p>
				</div>
			</div>
			<!-- End Grid -->
		</div>
		<!-- End Features -->

		<div class="max-w-xl mx-auto text-center">

			<div class="flex items-center justify-between px-3 pt-12 pb-2">
				<div class="text-2xl font-bold text-purple-100 font-arvo">Channels
				</div>

				<button @click.prevent="showModal({})"
					class="flex items-center justify-center px-3 py-2 font-semibold transition-colors bg-purple-900 rounded text-stone-200 hover:bg-purple-700">
					<IconPlus /><span class="ml-3">Add
					Channel</span></button>

			</div>
			<div v-if="channels" class="pb-12 text-left">
				<div class="space-y-3">
					<ChannelCard v-for="channel in channels" :channel="channel" />
				</div>
			</div>
		</div>

		<AppModalTest :is-active="isModalActive">
			<FormChannel @close="isModalActive = !isModalActive" @delete="deleteChannel" @add="addChannel($event)"
				@update="updateChannel($event)" :item="channelToEdit" />

		</AppModalTest>
	</div>
</template>

<script setup>
import { IconXCircle, IconX, IconAlbum, IconBxAlbum, IconMenu, IconPlus } from "@iconify-prerendered/vue-bx";
import { IconMusicBoxMultiple, IconMusicNote, IconMusic } from "@iconify-prerendered/vue-mdi";
import draggable from 'vuedraggable'
// import useToast from "vue-toastification";
// const toast = useToast();

const channels = ref([])
const isModalActive = ref(false)
const channelToEdit = ref({})

const addChannel = async (data) => {
	let res = await addDocToFirestore("channels", data);
	isModalActive.value = !isModalActive.value;
	console.log(data, res);
}

const showModal = (val) => {
	console.log(val)
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
	channels.value = await getDocsFromFirestore("channels")

	// let res = await getDocsFromFirestore("library")
	// console.log(res);
})
</script>

