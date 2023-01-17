import { fuzzy, randomItem, filterArray } from "~~/composables/useUtils"

export const getNextTrack = (channels: [], token: string) => {
  if (!channels || !token) return

  let stationName = token.split('::')[1]
  let searchChannels = fuzzy(channels, 'name');
  let channel = searchChannels(token.split('::')[0])
  channel = channel[0]
  let nextTrack = {};
  if (channel.shuffle) {
    // get random station, but not the one currently playing
    let tracks = filterArray(channel.stations, stationName);
    if (tracks && tracks.length > 0) {
      nextTrack = randomItem(tracks)
    }
  } else {
    // find index of station, check if index+1, then return
    // console.log(channel)
    for (let i = 0; i < channel.stations.length; i++) {
      const station = channel.stations[i];
      // @ts-ignore
      if (station.name == stationName) {
        // check if there is a track with index+1
        if (channel.stations[i + 1]) {
          nextTrack = channel.stations[i + 1]
          break;
        }
      }
    }
  }

  // @ts-ignore
  nextTrack["channel"] = channel.name
  return nextTrack
}

export const searchTrack = (query: string, channels: { name: any; stations: any[]; }[]) => {

  // console.log("search track", query, channels)
  let searchChannels = fuzzy(channels, 'name');
  let channel = searchChannels(query)
  let station = getStation(query, channels)
  let track;
  // get channel
  // If a channel matches the search term, it takes priority over station match
  // if recentlyPlayed, return that
  if (channel && channel.length > 0) {
    if (channel[0].recentlyPlayed) {
      track = channel[0].recentlyPlayed
      track.channel = channel[0].name
      return track
    } else if (channel[0].shuffle) {
      track = randomItem(channel[0].stations)
      track.channel = channel[0].name
      // else if shuffle is on, return random station
      return track
    } else {
      // else return first station 
      track = channel[0].stations[0]
      track.channel = channel[0].name
      return track
    }
  }
  // else check if station was found
  // @ts-ignore
  else if (station) {
    return station
  }
}

export const getStation = (stationName: any, channels: { name: any; stations: any[]; }[]) => {
  // @ts-ignore
  let allStations: any[] = []
  channels.map((channel: { name: any; stations: any[]; }) => {
    let channelName = channel.name
    channel.stations.map(station => {
      station.channel = channelName
      allStations.push(station)
    })
  })

  let searchAllStations = fuzzy(allStations, 'name');
  let station = searchAllStations(stationName)

  if (station && station.length > 0) {
    return station[0]
  }
}

export const getUpdatedChannel = (token: string, offset: number, channels: []) => {

  let searchChannels = fuzzy(channels, 'name');
  let channel = searchChannels(token.split('::')[0])

  // @ts-ignore
  let searchStations = fuzzy(channel[0].stations, 'name');
  // @ts-ignore
  let stationName = token.split('::')[1]
  let station;

  for (let i = 0; i < channel[0].stations.length; i++) {
    station = channel[0].stations[i];
    // console.log("station", station.name, stationName)
    // @ts-ignore
    if (station.name == stationName) {
      // update the offset
      station.offset = offset
      break
      // console.log("offset", stationName)
    }
  }

  // update channel with recentlyPlayed
  channel[0].recentlyPlayed = {
    name: station.name,
    url: station.url,
    offset: offset || 0,
    channel: channel[0].name
  }

  return channel[0]

  // update library with recentlyPlayed
  // let data = {
  //   recentlyPlayed: {
  //     name: station[0].name,
  //     url: station[0].url,
  //     offset: station[0].offset,
  //     channel: channel[0].name
  //   }
  // 
}

export const getRandomTrack = (channels: []) => {
  let randomChannelIndex = Math.floor(Math.random() * channels.length);
  let randomChannel: {recentlyPlayed: {}, stations: []} = channels[randomChannelIndex];
  
  // if shuffle on 
  // @ts-ignore
  let randomStationIndex = Math.floor(Math.random() * randomChannel?.stations.length);
  // @ts-ignore
  let randomStation = randomChannel.stations[randomStationIndex];
  // else
  // if there is recentlyPlayed
  if (randomChannel.recentlyPlayed) {
    return randomChannel.recentlyPlayed
  } else {
    // retun first track
    // ts-ignore
    return randomChannel?.stations[0]
  }
}

export const getOutputSpeech = (responses: [], type: string) => {
  // @ts-ignore
  return randomItem(responses[type])
}