<template>
    <v-dialog v-model="open" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Settings</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="OMX" required v-model="omx"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Kinohub" required v-model="kinohub"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Video Quality"
                  required
                  item-value="id"
                  :items="quality.options"
                  v-model="quality.selected"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close()">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    open: Boolean
  },
  data: () => ({
    omx: "",
    kinohub: "",
    quality: {
      selected: "HQ",
      options: [
        { id: "HQ", text: "High" },
        { id: "MQ", text: "Medium" },
        { id: "LQ", text: "Low" }
      ]
    }
  }),
  beforeMount: function() {
    this.$data.omx = this.$store.state.remotes.omx;
    this.$data.kinohub = this.$store.state.remotes.kinohub;
    this.$data.quality.selected = this.$store.state.quality;
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    save: function() {
      this.$store.commit("setOMX", this.$data.omx);
      this.$store.commit("setKinoHub", this.$data.kinohub);
      this.$store.commit("setQuality", this.$data.quality.selected);
      this.$emit("close");
    }
  }
};
</script>
