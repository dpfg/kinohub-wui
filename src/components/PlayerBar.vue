<template>
  <v-card
    tile
    v-if="status.running"
    v-touch="{
      up: () => swipe('up'),
      down: () => swipe('down')
    }">
    <div class="fixed-bottom-bar">
      <v-progress-linear height="3" :value="50" class="my-0"></v-progress-linear>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn icon @click.native="toggleMode()">
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{statusTitle}}</v-list-tile-title>
            <v-list-tile-sub-title>{{statusSubTitle}}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action >
            <v-btn icon>
              <v-icon>pause</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <v-card class="full-screen" v-bind:class="{ 'full-screen-active': fullScreen, 'full-screen-base': true }" >
      <v-btn icon @click.native="toggleMode()">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <player/>
    </v-card>
  </v-card>
</template>
<script>
import Player from "@/components/Player.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "PlayerBar",
  data: () => ({
    fullScreen: false
  }),
  methods: {
    swipe(direction) {
      if (direction === "up" && !this.fullScreen) {
        this.fullScreen = true;
      }

      if (direction === "down" && this.fullScreen) {
        this.fullScreen = false;
      }
    },
    toggleMode() {
      this.fullScreen = !this.fullScreen;
    }
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapGetters([
      "statusCover",
      "statusTitle",
      "statusSubTitle",
      "statusLink"
    ])
  },
  components: {
    Player
  }
};
</script>

<style scoped>
.fixed-bottom-bar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 5;
}

.full-screen-base {
  transition: top 0.4s;
  height: 0px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 5;
  top: 1000px;
}

.full-screen-active {
  transition: top 0.4s;
  height: 100px;
  top: 0px;
}
</style>
