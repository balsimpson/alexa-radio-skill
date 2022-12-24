import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDocsFromFirestore } from "~~/composables/useFirebase";
import { fuzzy, randomItem } from "~~/composables/useUtils"

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

  let allStations = []

  channels.map((channel: { name: any; stations: any[]; }) => {
    let channelName = channel.name
    channel.stations.map(station => {
      station.channel = channelName
      allStations.push(station)
    })
  })

  let searchChannels = fuzzy(channels, 'name');
  let searchStations = fuzzy(allStations, 'name');

  
  // console.log(library);
  // Launch
  // play recently played
  // else play random channel
  let channel = [];
  let station = [];
  
  // Play Intent - search
  if (query.search) {
    channel = searchChannels(query.search)
    station = searchStations(query.search)
    // get channel
    // if recentlyPlayed, return that
    if (channel && channel.length > 0) {
      if (channel[0].recentlyPlayed) {
        return channel[0].recentlyPlayed
      } else if (channel[0].shuffle) {
        // else if shuffle is on, return random station
        return randomItem(channel[0].stations)
      } else {
        // else return first station 
        return channel[0].stations[0]
      }
    }
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
  if (query.queue) {
    console.log(query.queue)
  }

  // Stop


  // Help


  // console.log("event", event.context, body)
  // console.log("body", body)
  console.log("query", query)
  return {
    channel: channel,
    station: station
  }
})