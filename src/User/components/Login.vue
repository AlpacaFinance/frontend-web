<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md7>
            <v-card class="elevation-12 pa-10 rounded-xl">
              <v-card-text>
                <v-card-title class="font-weight-bold">
                  Te damos la bienvenida a Alpaca Finance
                </v-card-title>
                <v-form>
                  <v-text-field
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      prepend-icon="mdi-account"
                      name="email"
                      label="Email"
                      type="text"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="showPass ? 'text' : 'password'"
                      name="password"
                      label="Contraseña"
                      hint="At least 8 characters"
                      @click:append="showPass = !showPass"
                  ></v-text-field>

                  <v-list-item class="subtitle-1 font-weight-bold" to="/historial" link>
                    ¿Has olvidado tu contraseña?
                  </v-list-item>
                  <v-card-actions>
                    <v-row
                        class="pa-5"
                        align="center"
                        justify="space-around">
                      <v-btn
                          width="80%"
                          rounded
                          color="primary"
                          to="/">Iniciar Sesión
                      </v-btn>
                    </v-row>
                  </v-card-actions>
                </v-form>
              </v-card-text>
              <v-card-text class="text-center subtitle-1 font-weight-bold">
                ¿Aún no tienes una cuenta?
              </v-card-text>
              <v-card-actions>
                <v-row
                    class="pa-5"
                    align="center"
                    justify="space-around">
                  <v-btn
                      width="75%"
                      rounded
                      color="primary"
                      to="/signup">Registrate
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  props: {
    source: String,
  },
  data() {
    return {
      email: '',
      showPass: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
};
</script>