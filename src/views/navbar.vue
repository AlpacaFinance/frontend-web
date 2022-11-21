<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <v-app-bar-title class="text-no-wrap">
        Alpaca Finance
      </v-app-bar-title>
    </div>

    <v-spacer></v-spacer>

    <template
        v-if="this.$router.currentRoute.name === 'login'
        || this.$router.currentRoute.name === 'signup'">
      <v-btn
          v-for="(item, index) in externalRutes" :key="index"
          text
          @click="insertExternalRutes(item.rute)"
      >
        <span class="mr-2">{{item.name}}</span>
      </v-btn>
    </template>

    <template
        v-if="this.$router.currentRoute.name === 'simulator'
        || this.$router.currentRoute.name === 'history'">
      <v-btn
          v-for="(item, index) in internalRutes" :key="index"
          text
          @click="insertInternalRutes(item.rute)"
      >
        <span class="mr-2">{{item.name}}</span>
      </v-btn>
    </template>

  </v-app-bar>
</template>

<script>

export default {
  name: 'NavBar',

  data: () => ({
    externalRutes:[
      { name: 'Iniciar sesión', rute: '/' },
      { name: 'Registrarse', rute: '/signup' }
    ],
    internalRutes:[
      { name: 'Simulador', rute: '/simulador/' },
      { name: 'Historial', rute: '/historial/' },
      { name: 'Cerrar Sesión', rute: '/' },
    ],
    userId: null,
  }),

  methods: {
    insertExternalRutes(rute){
      this.$router.push(rute);
    },
    insertInternalRutes(rute){
      if(rute==='/'){
        this.$router.push(rute);
      }
      else {
        this.$router.push(rute + this.userId);
      }

    },
  },
  mounted() {
    this.userId = this.$route.params.id;
  }
};
</script>