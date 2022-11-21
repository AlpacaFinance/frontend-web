<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <Profile></Profile>
      </v-col>

      <v-col cols="9">
        <SimulatorV2/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Simulator from '../components/Simulator'
import SimulatorV2 from '../components/SimulatorV2'
import Profile from "@/User/components/Profile"

export default {
  name: 'SimulatorView',

  components: {
    Simulator,
    SimulatorV2,
    Profile
  },
}
</script>
