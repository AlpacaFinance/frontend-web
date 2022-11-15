<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <Profile />
      </v-col>

      <v-col cols="9">
        <History />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import History from '../components/History'
import Profile from "@/User/components/Profile";

export default {
  name: 'HistoryView',

  components: {
    History,
    Profile
  },
}
</script>
