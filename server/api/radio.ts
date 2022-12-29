import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDocsFromFirestore, getDocFromFirestore, updateDocInFirestore } from "~~/composables/useFirebase";
import { fuzzy, randomItem } from "~~/composables/useUtils"
import { getNextTrack, searchTrack, getUpdatedChannel, getOutputSpeech } from "~~/composables/useRadio"

export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig()
  // const body = await readBody(event)
  const query = getQuery(event)

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    projectId: config.FIREBASE_PROJECT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // get library
  const channels = await getDocsFromFirestore("channels");
  const responses = await getDocFromFirestore("alexa", "responses")

  // Play Intent - search
  if (query.search) {
    // @ts-ignore
    let track = searchTrack(query.search, channels)
    track.speech = getOutputSpeech(responses, "now_playing")
    return track
  }

  // playback Started


  if (query.queue) {
    let track = getNextTrack(channels, query.queue) || { speech: "There are no tracks in the queue." }
    // @ts-ignore
    track.speech = getOutputSpeech(responses, "next_playing")
    return track
  }

  // Stop
  if (query.stop) {
    // let updatedLibrary = getUpdateLibrary(query.stop, query.offset, channels)
    let channelToUpdate = getUpdatedChannel(query.stop, query.offset, channels)
    // update doc in firestore
    let res = await updateDocInFirestore("channels", channelToUpdate.uid, channelToUpdate)
    let speech = getOutputSpeech(responses, "stop_playing")
    return { speech }
  }
})