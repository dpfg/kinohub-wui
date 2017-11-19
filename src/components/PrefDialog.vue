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
                <v-text-field label="OMX" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Kinohub" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Video Quality"
                  required
                  :items="['High', 'Medium', 'Low']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close()">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="close()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    open: Boolean
  },
  methods: {
    close: function() {
      this.$emit("close");
    }
  }
};
</script>
