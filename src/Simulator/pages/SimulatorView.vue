<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <Profile></Profile>
      </v-col>

      <v-col cols="9">
        <Simulator/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Simulator from '../components/Simulator'
import Profile from "@/User/components/Profile"

export default {
  name: 'SimulatorView',

  components: {
    Simulator,
    Profile
  },
}
</script>
