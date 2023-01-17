import { initializeApp } from "firebase/app";
import { getDocsFromFirestore, getDocFromFirestore, updateDocInFirestore, setDocInFirestore } from "~~/composables/useFirebase";
import { getNextTrack, getRandomTrack, searchTrack, getUpdatedChannel, getOutputSpeech, getStation } from "~~/composables/useRadio"

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
    return { speech: "Goodbye!" };
  }
}

const launchTrackHandler = async (channels: [], responses: []) => {
  const recentlyPlayed = await getDocFromFirestore("alexa", "recentlyPlayed");
  // if alexa/reventlyPlayed is populated, resume it
  if (channels.length > 0) {
    if (recentlyPlayed) {
      console.log("recentlyPlayed", recentlyPlayed)
      return {
        track: recentlyPlayed,
        speech: "Welcome"
      };
    } else {
      // get random channel
      let randomTrack = getRandomTrack(channels);
      console.log("randomTrack", randomTrack)
      return {
        track: randomTrack,
        speech: "Welcome"
      };
    }
  } else {
    console.log("else")
    return {
      speech: `Please add a channel!`
    };
  }
}

const resumeTrackHandler = async (channels: [], responses: []) => {
  const recentlyPlayed = await getDocFromFirestore("alexa", "recentlyPlayed");
  // if alexa/reventlyPlayed is populated, resume it
  if (recentlyPlayed) {
    return {
      recentlyPlayed,
      speech: getOutputSpeech(responses, "launch")
    };
  } else {
    // get random channel
    return {
      speech: `Nothing to resume!`
    };
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
  interface Query {
    launch?: string;
    search?: string;
    queue?: string;
    resume?: string;
    stop?: string;
    playback?: string;
    offset?: number;
  }
  const query = getQuery(event) as Query;
  const config = useRuntimeConfig();

  const app = initializeApp({
    apiKey: config.private.FIREBASE_API_KEY,
    projectId: config.private.FIREBASE_PROJECT_ID,
  });

  const channels: any = await getDocsFromFirestore("channels");
  const responses: any = await getDocFromFirestore("alexa", "responses");

  if (query.launch) {
    return launchTrackHandler(channels, responses);
  } else if (query.search) {
    return searchTrackHandler(query.search, channels, responses);
  } else if (query.queue) {
    return nextTrackHandler(channels, query.queue, responses);
  } else if (query.resume) {
    return resumeTrackHandler(channels, responses);
  } else if (query.stop) {
    return stopTrackHandler(channels, query.stop, query.offset || 0, responses);
  } else if (query.playback) {
    logPlaybackStatus(query.playback);
  }
});



