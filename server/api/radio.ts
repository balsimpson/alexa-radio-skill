import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDocsFromFirestore } from "~~/composables/useFirebase";
import { fuzzy, randomItem } from "~~/composables/useUtils"
import { getNextTrack, searchTrack, getUpdateLibrary } from "~~/composables/useRadio"

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

  // Play Intent - search
  if (query.search) {
    // @ts-ignore
    let track = searchTrack(query.search, channels)
    return track
  }

  // playback Started


  // Next || Queue
  if (query.queue) {
    // @ts-ignore
    // get channel from token
    // let channel = searchChannels(query.next.split('::')[0])
    // @ts-ignore
    let stationName = query.queue.split('::')[1]
    return getNextTrack(channels, stationName)
  }

  // Stop
  if (query.stop) {
    let updatedLibrary = getUpdateLibrary(query.stop, query.offset, channels)
    
    console.log(updatedLibrary)
  }
})