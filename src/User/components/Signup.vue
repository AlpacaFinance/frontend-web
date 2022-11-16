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
                  <v-row>
                    <v-col>
                      <v-text-field
                          v-model="firstName"
                          :rules="[rules.required, rules.firstNameRules]"
                          name="firstName"
                          label="Nombres"
                          type="text"
                          :counter="15"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          v-model="lastName"
                          :rules="[rules.required, rules.lastNameRules]"
                          name="lastName"
                          label="Apellidos"
                          type="text"
                          :counter="35"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      name="email"
                      label="Email"
                      type="text"
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="showPass ? 'text' : 'password'"
                      name="password"
                      label="Contraseña"
                      hint="At least 8 characters"
                      @click:append="showPass = !showPass"
                  ></v-text-field>
                  <p class="subtitle-1 font-weight-bold" to="/historial" link>
                    Información de la Cuenta
                  </p>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                          :items="documentType"
                          label="Tipo de documento"
                          solo
                      ></v-select>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                          v-model="nroDocument"
                          :rules="[rules.required, rules.nroDocument]"
                          name="nroDocument"
                          label="Número de documento"
                          type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                          :items="countryCode"
                          label="Código de País"
                          solo
                      ></v-select>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                          v-model="phone"
                          :rules="[rules.required, rules.phone]"
                          name="phone"
                          label="Número de contacto"
                          type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-row
                        class="pa-5"
                        align="center"
                        justify="space-around">
                      <v-btn
                          width="80%"
                          rounded
                          color="primary"
                          to="/">Finalizar
                      </v-btn>
                    </v-row>
                  </v-card-actions>
                </v-form>
              </v-card-text>
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
      firstName: '',
      lastName: '',
      documentType: ['DNI', 'Carnet de Extranjería', 'Pasaporte'],
      nroDocument: '',
      countryCode: ['+51 (Perú)', '+52 (México)', '+56 (Chile)', '+57 (Colombia)'],
      phone:'',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        firstNameRules: v => v.length <= 15 || 'Firstname must be less than 15 characters',
        lastNameRules: v => v.length <= 35 || 'Lastname must be less than 35 characters',
        nroDocument: v => v.length == 8 || 'Document number must be 8 characters',
        phone: v => v.length >= 9 || 'Min 8 characters',
      },
    }
  },
};
</script>