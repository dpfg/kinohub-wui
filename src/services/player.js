import { OmxClient } from "./omx";

export function playEpisode($store, { serial, season, episode }) {
  let appState = $store.state;

  let omx = new OmxClient(appState.remotes.omx);
  let file = getFile(episode, appState.quality);

  if (file) {
    omx
      .play(file.url.hls, createMediaEntry(serial, season, episode))
      .then(() =>
        $store.commit("msg/set", {
          message: "Casting to the TV",
        })
      )
      .catch((e) =>
        $store.commit("msg/set", {
          message: `Unable to cast episode: ${e.message}`,
        })
      );
  }
}

function getFile(episode, quality) {
  var q = "480p";
  if (quality === "MQ") {
    q = "720p";
  } else if (quality === "HQ") {
    q = "1080p";
  }

  var fileFinder = (f) => (f.quality = q);
  return episode.files.find(fileFinder);
}

export function createMediaEntry(serial, season, episode) {
  return {
    type: "SERIAL",
    serial: {
      uid: serial.uid,
      poster_path: serial.poster_path,
      title: serial.title,
    },
    season: {
      number: season.number,
    },
    episode: {
      title: episode.title,
      number: episode.number,
    },
  };
}
