import { initializeApp } from "firebase/app";
import { getDocsFromFirestore, getDocFromFirestore, updateDocInFirestore, setDocInFirestore } from "~~/composables/useFirebase";
import { getNextTrack, searchTrack, getUpdatedChannel, getOutputSpeech, getStation } from "~~/composables/useRadio"

const searchTrackHandler = (searchTerm: string, channels: [], responses: []) => {
  let track = searchTrack(searchTerm, channels);

  if (track) {
    return {
      track,
      speech: getOutputSpeech(responses, "now_playing")
    };
  } else {
    return {
      speech: `Sorry. I did not find ${searchTerm}!`
    };
  }
}

const nextTrackHandler = (channels: [], queue: string, responses: []) => {
  let track = getNextTrack(channels, queue);

  if (track) {
    return {
      track,
      speech: getOutputSpeech(responses, "next_playing")
    };
  } else {
    return {
      speech: "There are no tracks in the queue."
    };
  }
}

const stopTrackHandler = async (channels: [], stopTrack: string, offset: number, responses: []) => {
  let channelToUpdate = getUpdatedChannel(stopTrack, offset, channels);
  let station = getStation(stopTrack.split("::")[1], channels);

  let updateRes = await updateDocInFirestore("channels", channelToUpdate.uid, channelToUpdate);
  let setRes = await setDocInFirestore("alexa", "recentlyPlayed", {
    channel: channelToUpdate.name,
    name: station.name,
    url: station.url,
    offset: station.offset,
    lastUpdated: Date.now()
  });

  let speech = getOutputSpeech(responses, "stop_playing");
  if (speech) {
    return { speech };
  } else {
    return "Goodbye!";
  }
}


// add another function that logs playback status like streaming, stopped, failed when query.playback
const logPlaybackStatus = (status: string) => {
  let playback_status = status.split('__')[0]
  switch (playback_status) {
    case "streaming":
      console.log("Playback status: Streaming");
      break;
    case "stopped":
      console.log("Playback status: Stopped");
      break;
    case "failed":
      console.log("Playback status: Failed");
      break;
    default:
      console.log("Invalid playback status");
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();

  const app = initializeApp({
    apiKey: config.private.FIREBASE_API_KEY,
    projectId: config.private.FIREBASE_PROJECT_ID,
  });
  
  const channels = await getDocsFromFirestore("channels");
  const responses = await getDocFromFirestore("alexa", "responses");

  if (query.search) {
    return searchTrackHandler(
      // @ts-ignore
      query.search, channels, responses);
    }
    
    if (query.queue) {
      // @ts-ignore
      return nextTrackHandler(channels, query.queue, responses);
    }
    
    if (query.stop) {
    // @ts-ignore
    return stopTrackHandler(channels, query.stop, query.offset, responses);
  }

  if (query.playback) {
    // @ts-ignore
    // playback token is in the format status__token
    // e.g. failed__GTA Radio::Blonded
    logPlaybackStatus(query.playback);
  }
});
