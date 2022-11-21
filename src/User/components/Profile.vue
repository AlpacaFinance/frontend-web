<template>
  <v-container>
    <v-card
        v-if="!editInfo"
        class="pa-5 rounded-xl">
      <div>
        <template>
          <v-row>
            <v-col
                class="d-flex child-flex"
            >
              <v-img
                  :src="this.imageURL"
                  :lazy-src="this.imageURL"
                  aspect-ratio="0.9"
                  width="25"
                  class="grey lighten-2 rounded-circle"
              >
                <template v-slot:placeholder>
                  <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                  >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </template>
      </div>
      <v-card-title>
        {{userData.name}}
      </v-card-title>
      <v-card-subtitle>
        {{userData.email}}
      </v-card-subtitle>
      <v-card-text >
        <p class="font-weight-bold">DNI:</p>
        <p>{{userData.dni}}</p>
        <p class="font-weight-bold">Pais:</p>
        <p>{{userData.country}}</p>
        <p class="font-weight-bold">Número de contacto:</p>
        <p>{{userData.telephone}}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {getProfileByUserId} from "@/User/services/profileServices";

export default {
  name: 'Profile',

  data: () => ({
    errors: [],
    editInfo: false,
    customer: [],
    userData: '',
    imageURL: 'https://www.mastercard.com/news/media/yi2dv54u/camila-x-mc2.jpg',
  }),

  props: ['id'],

  async mounted() {
    this.userData = await getProfileByUserId(this.$route.params.id)
  }
}
</script>
