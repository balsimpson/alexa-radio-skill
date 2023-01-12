import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDocsFromFirestore, getDocFromFirestore } from "~~/composables/useFirebase";
import { fuzzy, randomItem } from "~~/composables/useUtils"
import { getNextTrack, searchTrack } from "~~/composables/useRadio"

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
  const recentlyPlayed = await getDocFromFirestore("alexa", "recentlyPlayed")

  // return { channels, recentlyPlayed }
  return channels
})