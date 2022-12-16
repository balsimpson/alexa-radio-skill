<template>
	<div class="max-w-xl mx-auto ">
		<div class="mt-12 text-xl font-bold text-center font-arvo">
			Alexa Audio Player supports AAC/MP4, MP3, HLS, PLS and M3U audio streams ranging from 16kbps to 384kbps.
			Make sure the stream URL starts with https
		</div>

		<div class="mt-6 text-center">
			<button @click="isModalActive = !isModalActive" class="px-3 py-1 font-bold text-white rounded bg-cyan-600">
				Add Channel
			</button>

		</div>

		<div v-if="channels">
			<div class="space-y-3">
				<div v-for="channel in channels">
					<div class="flex items-center">
						<IconBxAlbum />
						<div class="ml-2 text-2xl font-bold">{{ channel.name }}</div>
					</div>
					<div v-for="station in channel.stations" class="w-full p-4 text-white bg-gray-600 rounded">
						<div class="text-xl font-semibold tracking-wide break-words">{{ station.name }}</div>
						<div class="text-sm break-words">{{ station.url }}</div>
					</div>
				</div>
			</div>
		</div>

		<AppModalNew @save="saveChannel($event)" :isActive="isModalActive" @close="isModalActive = !isModalActive" />

		<!-- <AppModalNew /> -->
		<!-- <AppModal @close="isModalActive = !isModalActive" :is-active="isModalActive">


			
		</AppModal> -->

	</div>
</template>

<script setup>
import { IconXCircle, IconAlbum, IconBxAlbum } from "@iconify-prerendered/vue-bx";

const channels = ref([])
const isModalActive = ref(false)

const saveChannel = async (data) => {
	let res = await addDocToFirestore("channels", data);
	console.log(data, res);
}

onMounted(async () => {
	channels.value = await getDocsFromFirestore("channels")
})
</script>