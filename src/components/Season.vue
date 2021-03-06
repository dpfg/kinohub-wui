<template>
  <v-container fluid>
    <v-layout wrap v-if="!loading">
      <v-flex xs12 sm6 md4 mb-3 d-flex v-for="episode in season.episodes" v-bind:key="episode.number">
        <v-card class="episode">
          <v-card-media :src="getEpisodeStill(episode)" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="episode-headline mb-0">
                <h3>{{ getEpisodeTitle(episode) }}</h3>
                <span class="grey--text">{{ episode.first_aired }}</span><br>
              </div>
              <div class="overview">{{ episode.overview }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="red" v-if="episode.files" @click="play(episode)">Play Now</v-btn>
            <v-btn flat color="grey lighten-1" v-if="episode.files" @click="addToQueue(episode)">Add to queue</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center v-if="loading">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import { KinohubClient } from "../services/kinohub";
import { OmxClient } from "../services/omx";
import { playEpisode, createMediaEntry } from "../services/player";

export default {
  name: "Season",
  created: function() {
    this.loading = true;

    let kinohub = new KinohubClient(this.$store.state.remotes.kinohub);
    let routeParams = this.$route.params;

    Promise.all([
      kinohub.getSerial(routeParams.id),
      kinohub.getSeason(routeParams.id, routeParams.num)
    ])
      .then(values => {
        this.loading = false;
        this.serial = values[0];
        this.season = values[1];
      })
      .catch(e => {
        this.loading = false;
        this.$store.commit("msg/set", { message: e.message });
      });
  },
  methods: {
    play(episode) {
      playEpisode(this.$store, {
        serial: this.serial,
        season: this.season,
        episode
      });
    },
    addToQueue(episode) {
      let appState = this.$store.state;

      let omx = new OmxClient(appState.remotes.omx);
      let file = getFile(episode, appState.quality);

      if (file) {
        omx
          .playListAddEntry(
            file.url.http,
            createMediaEntry(this.serial, this.season, episode)
          )
          .then(() => {
            let title = this.getEpisodeTitle(episode);
            this.$store.commit("msg/set", {
              message: `Episode "${title}" has been added to the queue`
            });
          })
          .catch(e =>
            this.$store.commit("msg/set", {
              message: `Unable to add episode to the queue: ${e.message}`
            })
          );
      }
    },

    getEpisodeTitle(episode) {
      return `S${this.season.number}E${episode.number} ${episode.title}`;
    },

    getEpisodeStill(episode) {
      if (!episode.still_path) {
        return this.serial.backdrop_path;
      }
      return episode.still_path;
    }
  },
  data: () => ({
    loading: true,
    season: null
  })
};

function getFile(episode, quality) {
  var q = "480p";
  if (quality === "MQ") {
    q = "720p";
  } else if (quality === "HQ") {
    q = "1080p";
  }

  var fileFinder = f => (f.quality = q);
  return episode.files.find(fileFinder);
}
</script>

<style scoped>
.episode {
  /* width: 300px; */
  margin-right: 10px;
}

.episode-headline {
  min-height: 76px;
}

.episode-headline h3 {
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 5px;
}

.overview {
  max-height: 60px;
  overflow: scroll;
}
</style>
