import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDocsFromFirestore } from "~~/composables/useFirebase";

export default defineEventHandler( async (event) => {
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
  const library = await getDocsFromFirestore("channels");

  // console.log(library);
  // Launch
    // play recently played
    // else play random channel

  // Play Intent - search
  if (query.search) {
    // get channel
    console.log(JSON.stringify(library))
      // if recentlyPlayed, return that
      // else if shuffle is on, return random station
        // else return first station 
    // get station
      // if station, return station

    // if no track found, return error

  }

  // Next
    // get channel from token
      // if shuffle on, return random station
      // else return next station

      //  if no next station, return error

  // Queue


  // Stop


  // Help


  // console.log("event", event.context, body)
  // console.log("body", body)
  console.log("query", query)
  return {
    channel: "Blues",
    station: "Acoustic Blues",
    url: "https://stream-39.zeno.fm/agtp9c146qzuv?zs=azWAiz9SQTCC2pjV4LgLUg"
  }
})