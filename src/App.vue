<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/views/navbar";
export default {
  name: 'App',
  components: {NavBar},
};
</script>
