<template>
  <v-app>
    <v-main>
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
                  <v-row>
                    <v-col>
                      <validation-provider
                          v-slot="{ errors }"
                          name="firstName"
                          rules="required|max:30"
                      >
                        <v-text-field
                            v-model="firstName"
                            :counter="30"
                            :error-messages="errors"
                            label="Nombres"
                            required
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col>
                      <validation-provider
                          v-slot="{ errors }"
                          name="lastName"
                          rules="required|max:30"
                      >
                        <v-text-field
                            v-model="lastName"
                            :counter="30"
                            :error-messages="errors"
                            label="Apellidos"
                            required
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
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

                  <p class="subtitle-1 font-weight-bold">
                    Información de la Cuenta
                  </p>

                  <v-row>
                    <v-col cols="4">
                      <validation-provider
                          v-slot="{ errors }"
                          name="document type"
                          rules="required"
                      >
                        <v-select
                            v-model="documentType"
                            :items="documentTypeList"
                            :error-messages="errors"
                            label="Tipo de documento"
                            data-vv-name="documentTypeSelect"
                            required
                            solo
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <v-col cols="8">
                      <validation-provider
                          v-slot="{ errors }"
                          name="document number"
                          :rules="{
                        required: true,
                        digits: 8,
                  }"
                      >
                        <v-text-field
                            v-model="documentNumber"
                            :counter="8"
                            :error-messages="errors"
                            label="Número de documento"
                            required
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <validation-provider
                          v-slot="{ errors }"
                          name="country"
                          rules="required"
                      >
                        <v-select
                            v-model="country"
                            :items="countryList"
                            :error-messages="errors"
                            label="País"
                            data-vv-name="countrySelect"
                            required
                            solo
                        ></v-select>
                      </validation-provider>
                    </v-col>
                    <v-col cols="8">
                      <validation-provider
                          v-slot="{ errors }"
                          name="phoneNumber"
                          :rules="{
                        required: true,
                        digits: 9,
                        regex: '^(9)\\d{8}$'
                  }"
                      >
                        <v-text-field
                            v-model="phoneNumber"
                            :counter="9"
                            :error-messages="errors"
                            label="Número de teléfono"
                            required
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>

                  <validation-provider
                      v-slot="{ errors }"
                      rules="mustAccept"
                      name="age checkbox"
                  >
                    <v-checkbox
                        v-model="ageCheckbox"
                        :error-messages="errors"
                        value="1"
                        label="Declaro tener +18 años de edad."
                        type="checkbox"
                        required
                    ></v-checkbox>
                  </validation-provider>

                  <validation-provider
                      v-slot="{ errors }"
                      rules="mustAccept"
                      name="terms agree checkbox"
                  >
                    <v-checkbox
                        v-model="termsAgreeCheckbox"
                        :error-messages="errors"
                        value="1"
                        label="Acepto los términos y condiciones de Alpaca Finance."
                        type="checkbox"
                        required
                    ></v-checkbox>
                  </validation-provider>

                  <v-row
                      class="pa-5"
                      align="center"
                      justify="space-around">
                    <v-btn
                        width="80%"
                        rounded
                        color="primary"
                        to="/"
                        type="submit"
                        :disabled="invalid"
                    >
                      Finalizar
                    </v-btn>
                  </v-row>
                </form>
              </validation-observer>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {required, digits, email, min, max, regex} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import {postUser} from "@/User/services/profileServices";

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: 'Este campo debe contener {length} dígitos. ({_value_})',
})

extend('required', {
  ...required,
  message: 'Este campo no puede estar vacío',
})

extend('mustAccept', {
  ...required,
  message: 'Se requiere que seleccione esta opción',
})

extend('min', {
  ...min,
  message: 'No puede contener menos de {length} caracteres',
})

extend('max', {
  ...max,
  message: 'No puede exceder los {length} caracteres',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'El correo debe ser válido',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    showPass: false,
    password: '',
    documentType: '',
    documentTypeList: ['DNI', 'Carnet de Extranjería', 'Pasaporte'],
    documentNumber:'',
    country:'',
    countryList:['Perú', 'México', 'Chile', 'Colombia'],
    phoneNumber: '',
    ageCheckbox: null,
    termsAgreeCheckbox: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
    },
    async signup() {
      let user = {
        name: this.firstName + '' + this.lastName,
        dni: this.documentNumber,
        email: this.email,
        password: this.password,
        country: this.country,
        phone: this.phoneNumber,
      };

      await postUser(user).then(resp =>{
        console.log(resp)
        this.$router.push("/login")
      });

      /*if (result.status === 200) {
        console.log(result.data)
      }*/
    },
  },
}
</script>