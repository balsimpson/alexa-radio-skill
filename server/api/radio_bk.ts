import { initializeApp } from "firebase/app";
import { getDocsFromFirestore, getDocFromFirestore, updateDocInFirestore, setDocInFirestore } from "~~/composables/useFirebase";
import { fuzzy, randomItem } from "~~/composables/useUtils"
import { getNextTrack, searchTrack, getUpdatedChannel, getOutputSpeech, getStation } from "~~/composables/useRadio"

export default defineEventHandler(async (event) => {
  // const config = useRuntimeConfig()
  // const body = await readBody(event)
  const query = getQuery(event)

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.private.FIREBASE_API_KEY,
    projectId: config.private.FIREBASE_PROJECT_ID,
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

    if (track) {
      // @ts-ignore
      track.speech = getOutputSpeech(responses, "now_playing")
    } else {
      track = { speech: "Sorry. I did not find " + query.search + "!"}
    }
    return track
  }

  // playback
  if (query.playback) {
    

  }
  // Next
  if (query.queue) {
    let track = getNextTrack(channels, query.queue) || { speech: "There are no tracks in the queue." }
    // @ts-ignore
    track.speech = getOutputSpeech(responses, "next_playing")
    return track
  }

  // Stop
  if (query.stop) {
    // let updatedLibrary = getUpdateLibrary(query.stop, query.offset, channels)
    // @ts-ignore
    let channelToUpdate = getUpdatedChannel(query.stop, query.offset, channels)

    // @ts-ignore
    let station = getStation(query.stop.split("::")[1], channels)
    // update doc in firestore
    let res = await updateDocInFirestore("channels", channelToUpdate.uid, channelToUpdate)

    let res1 = await setDocInFirestore("alexa", "recentlyPlayed", {
      channel: channelToUpdate.name,
      name: station.name,
      url: station.url,
      offset: station.offset,
      lastUpdated: Date.now()
    })

    // @ts-ignore
    let speech = getOutputSpeech(responses, "stop_playing")

    if (speech) {
      return { speech }
    } else {
      return "Goodbye!"

    }
  }
})