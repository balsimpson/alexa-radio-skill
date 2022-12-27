import { fuzzy, randomItem, filterArray } from "~~/composables/useUtils"

export const getNextTrack = (channel: { shuffle: any; stations: [] }, stationName: any) => {
  if (!channel || !stationName) return

  let nextTrack = {};

  if (channel.shuffle) {
    // get random station, but not the one currently playing
    let tracks = filterArray(channel.stations, stationName);

    if (tracks.length > 0) {
      nextTrack = randomItem(tracks)
    }
  } else {
    // find index of station, check if index+1, then return
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

  return nextTrack
}

export const searchTrack = (query: string, channels: { name: any; stations: any[]; }[]) => {

  console.log("search track", query, channels)
  let searchChannels = fuzzy(channels, 'name');
  let channel = searchChannels(query)
  let station = getStation(query, channels)
  // get channel
  // If a channel matches the search term, it takes priority over station match
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
  // else check if station was found
  // @ts-ignore
  else if (station) {
    return station
  }
}

export const getStation = (stationName: any, channels: { name: any; stations: any[]; }[]) => {
  let allStations = []

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

export const getUpdateLibrary = (token, offset, channels) => {

  let searchChannels = fuzzy(channels, 'name');
  let channel = searchChannels(token.split('::')[0])

  // @ts-ignore
  let searchStations = fuzzy(channel.stations, 'name');
  // @ts-ignore
  let station = searchStations(token.split('::')[1])

  //  update station offset
  station[0].offset = offset

  // update channel with recentlyPlayed
  channel[0].recentlyPlayed = {
    name: station[0].name,
    url: station[0].url,
    offset: station[0].offset,
  }

  // update library with recentlyPlayed
  // let data = {
  //   recentlyPlayed: {
  //     name: station[0].name,
  //     url: station[0].url,
  //     offset: station[0].offset,
  //     channel: channel[0].name
  //   }
  // }

  return channels
}