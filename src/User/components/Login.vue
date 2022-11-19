
<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md7>
            <v-card class="elevation-12 pa-10 rounded-xl">
              <v-card-title class="font-weight-bold">
                Te damos la bienvenida a Alpaca Finance
              </v-card-title>
              <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
              >
                <form @submit.prevent="submit">
                  <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                  >
                    <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        label="E-mail"
                        required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                      v-slot="{ errors }"
                      name="password"
                      rules="required|min:3"
                  >
                    <v-text-field
                        v-model="password"
                        :error-messages="errors"
                        label="Contraseña"
                        required
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPass ? 'text' : 'password'"
                        @click:append="showPass = !showPass"
                    ></v-text-field>
                  </validation-provider>

                  <v-list-item class="subtitle-1 font-weight-bold" to="/historial" link>
                    ¿Has olvidado tu contraseña?
                  </v-list-item>

                  <v-row
                      class="pa-5"
                      align="center"
                      justify="space-around">
                    <v-btn
                        v-on:click="login"
                        width="80%"
                        rounded
                        color="primary"

                        :disabled="invalid"
                    >
                      Iniciar Sesión
                    </v-btn>
                  </v-row>
                </form>
              </validation-observer>

              <p class="ma-5 text-center subtitle-1 font-weight-bold">
                ¿Aún no tienes una cuenta?
              </p>
              <v-row
                  class="pa-5"
                  align="center"
                  justify="space-around">
                <v-btn
                    width="80%"
                    rounded
                    color="primary"
                    to="/signup"
                >
                  Regístrate
                </v-btn>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {required, email} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Este campo no puede estar vacío',
})

extend('email', {
  ...email,
  message: 'El correo tiene que ser válido',
})

import axios from 'axios'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: '',
    showPass: false,
    password: '',
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
    },
    async login(){
      var urlemail = encodeURIComponent(this.email)
      var urlpassword = encodeURIComponent(this.password)
      let result = await axios.get(`https://alpacafinance.azurewebsites.net/api/v1/usuario/login?email=${urlemail}&password=${urlpassword}`)

      if(result.status==200){
        this.$router.go("/simulator")
      }

    },
  },
}
</script>