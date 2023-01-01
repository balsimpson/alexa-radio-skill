<template>
  <div class="max-w-lg px-4 py-12 mx-auto text-stone-400">
    <div class="sticky z-20 p-6 mb-12 border rounded-lg top-24 bg-stone-900 border-stone-800">
      <div class="flex flex-col items-center justify-between pb-3 space-y-5 text-center sm:space-y-0 sm:flex-row sm:text-left">
        <div>
          <div class="text-3xl font-bold">Settings</div>
          <div class="pr-6">Change the various Alexa responses.</div>
        </div>
        <button @click.prevent="saveSettings"
          class="flex items-center justify-center px-3 py-2 font-semibold transition-colors bg-purple-900 rounded text-stone-200 hover:bg-purple-700 w-[160px]">
          <span v-if="!isSaving">Save Settings</span>
          <span v-else class="flex items-center"><IconLoaderAlt class="mr-3 animate-spin"/>Saving</span>
        </button>
      </div>
    </div>
    
    <div class="overflow-y-scroll">
      
      <div v-if="responses" class="space-y-4">
        <!-- <pre>{{ responses }}</pre> -->
        <FormResponses @update="updateInputs('now_playing', $event)" :inputs="responses.now_playing" title="Now Playing"
          description="Alexa says this when playing a new station. e.g: Here is Acoustic Blues. Channel name will be added at the end automatically."
          placeholder="Now playing" />

        <FormResponses @update="updateInputs('stop_playing', $event)" :inputs="responses.stop_playing" title="Stop Playing"
          description="Alexa says this when you stop the skill." placeholder="Stop playing" />

        <FormResponses @update="updateInputs('next_playing', $event)" :inputs="responses.next_playing" title="Next Playing"
          description="Alexa says this when it plays the next station." placeholder="Next playing" />

        <FormResponses @update="updateInputs('help', $event)" :inputs="responses.help" title="Help"
          description="Alexa says this when you ask for help." placeholder="Ask me to play a station" />
      </div>
      <!-- if no responses, show form -->
    </div>
  </div>
</template>

<script setup>
// import useToast from "vue-toastification";
import { IconLoaderAlt } from "@iconify-prerendered/vue-bx";
import { setDoc } from '@firebase/firestore';

// const toast = useToast();
const responses = ref()
const ogData = ref()
const isDataChanged = ref(false)
const isSaving = ref(false)

const nowPlayingRepsonses = ref([])
const stopPlayingRepsonses = ref([])
const nextPlayingRepsonses = ref([])
const helpRepsonses = ref([])

onMounted(async () => {
  responses.value = await getDocFromFirestore("alexa", "responses")
  ogData.value = responses.value;
  nowPlayingRepsonses.value = responses.value.now_playing || ["Now playing"]
  stopPlayingRepsonses.value = responses.value.stop_playing || ["Goodbye!"]
  nextPlayingRepsonses.value = responses.value.next_playing || ["Next, "]
  helpRepsonses.value = responses.value.help || ["Use the settings to add help messages"]

  // console.log("responses", responses.value)
  // console.log("nowPlayingRepsonses", nowPlayingRepsonses.value)
})

const saveSettings = async () => {
  isSaving.value = true;
  let data = {
    now_playing: nowPlayingRepsonses.value,
    stop_playing: stopPlayingRepsonses.value,
    next_playing: nextPlayingRepsonses.value,
    help: helpRepsonses.value,
  }
  // console.log(nowPlayingRepsonses.value, stopPlayingRepsonses.value, data)

  let res = await setDocInFirestore("alexa", "responses", data)
  // console.log(res)
  isSaving.value = false;
}

const updateInputs = (type, data) => {
  switch (type) {
    case "now_playing":
      nowPlayingRepsonses.value = data;
      isDataChanged.value = 
      (ogData.value.now_playing !== nowPlayingRepsonses.value) ? true : false
      break;

    case "stop_playing":
      stopPlayingRepsonses.value = data;
      break;

    case "next_playing":
      nextPlayingRepsonses.value = data;
      break;

    case "help":
      helpRepsonses.value = data;
      break;

    default:
      break;
  }
}

</script>