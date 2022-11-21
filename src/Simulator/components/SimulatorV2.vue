<template>
  <v-container>
    <v-card
        class="pa-5 rounded-xl">
      <v-card-title>
        Simula tu Operación
      </v-card-title>
      <v-spacer></v-spacer>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <!-- Divisa -->
            <v-col cols="6">
              <p class="text-left">
                ¿Con qué divisa deseas realizar la simulación?
              </p>
              <v-select
                  v-model="divisaSelect"
                  :items="divisaType"
                  label="Divisa"
                  data-vv-name="divisaSelect"
                  required
              ></v-select>
            </v-col>

            <!-- Importe -->
            <v-col>
              <p class="text-left">
                ¿Cúal es el importe que deseas simular?
              </p>
              <v-text-field
                  v-model="amount"
                  :rules="amountRules"
                  placeholder="S/ 0.00"
                  type="number"
                  clearable
                  label="Importe"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Número de años -->
            <v-col cols="6">
              <p class="text-left">
                ¿A cúantos años?
              </p>
              <v-text-field
                  v-model="years"
                  :rules="yearsRules"
                  label="Años"
                  placeholder="0 años"
                  type="number"
                  clearable
                  required
              ></v-text-field>
            </v-col>

            <!-- Número de días por año -->
            <v-col>
              <p class="text-left">
                ¿Cuántos días tiene cada año?
              </p>
              <v-text-field
                  v-model="daysPerYear"
                  :rules="daysPerYearRules"
                  label="Días por año"
                  placeholder="0 días"
                  type="number"
                  clearable
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Tasa de interés -->
            <v-col>
              <p class="text-left">
                ¿Cúal es la tasa de interés?
              </p>
              <v-text-field
                  v-model="rate"
                  :rules="rateRules"
                  label="Tasa"
                  placeholder="0%"
                  type="number"
                  clearable
                  required
              ></v-text-field>
            </v-col>

            <!-- Días de periodo -->
            <v-col>
              <p class="text-left">
                ¿Cuántos días tiene cada periodo?
              </p>
              <v-text-field
                  v-model="periodDays"
                  :rules="periodDaysRules"
                  label="Días por periodo"
                  placeholder="0 días"
                  type="number"
                  clearable
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row
              class="pa-5"
              align="center"
              justify="space-around">
            <v-btn
                v-on:click="makeCal"
                width="80%"
                rounded
                color="primary"
            >
              Calcular
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <v-card
        v-if="visibleResults===true"
        class="mt-10 pa-5 rounded-xl">
      <v-card-title>
        Resultados
      </v-card-title>
      <v-row class="pl-5 pt-3 pr-5">
        <p>Tasa Nominal Anual:</p>
        <v-spacer></v-spacer>
        <p>{{ this.rate }}</p>
      </v-row>

      <v-row class="pl-5 pr-5">
        <p>Tasa Efectiva Anual: </p>
        <v-spacer></v-spacer>
        <p>{{ this.TEA }}</p>
      </v-row>

      <v-row class="pl-5 pr-5">
        <p>Nro de Periodos: </p>
        <v-spacer></v-spacer>
        <p>{{ this.periods }}</p>
      </v-row>

      <v-row class="pl-5 pr-5">
        <p>Comisiones: </p>
        <v-spacer></v-spacer>
        <p>{{ this.payment }}</p>
      </v-row>

      <template>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Año
              </th>
              <th class="text-left">
                Interés de cuota
              </th>
              <th class="text-left">
                Amortización de cuota
              </th>
              <th class="text-left">
                Capital
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in results"
                :key="item.year"
            >
              <td>{{ item.year }}</td>
              <td>{{ item.interest }}</td>
              <td>{{ item.amortization }}</td>
              <td>{{ item.capital }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import {getDivisaList} from "@/Simulator/services/divisaServices";

export default {
  name: 'SimulatorComponent',
  data: () => ({
    valid: false,
    amount: '',
    amountRules: [
      v => !!v || 'Import is required',
    ],
    rate: '',
    rateRules: [
      v => !!v || 'Rate is required',
    ],
    divisaSelect: null,
    divisaType: [],
    years: '',
    yearsRules: [
      v => !!v || 'Years is required',
    ],
    daysPerYear: '',
    daysPerYearRules: [
      v => !!v || 'Days per year is required',
      v => v === '360' || v === '365' || 'Invalid input',
    ],
    periodDays: '',
    periodDaysRules: [
      v => !!v || 'Days per period is required',
    ],

    // Resultados:

    visibleResults: false,
    payment: '',
    TEA: '',
    periods: '',

    //Table
    interest: '',
    amortization: '',
    capital: '',
    item: {
      year: '',
      interest: '',
      amortization: '',
      capital: '',
    },
    results: [],
  }),

  methods: {
    async divisaList() {
      let result = await getDivisaList();
      for (let key in result) {
        this.divisaType.push(result[key]['nameDivisa'])
      }
    },

    makeCal() {
      this.getPaymentAmount()
      this.getTEA()
      this.getTableArray()
      this.visibleResults = !this.visibleResults;
    },

    getPaymentAmount() {
      let payment = 0
      let ex = this.amount * 0.006213635
      let rate = this.rate / 100
      let periods = this.daysPerYear / this.periodDays
      payment = ((rate * Math.pow(1 + rate, periods)) * this.amount) / (Math.pow(1 + rate, periods) - 1) - ex
      this.payment = payment.toFixed(2)
      this.periods = periods
    },

    getTEA() {
      let rate = this.rate / 100
      let aux = Math.pow((1 + (rate / this.years)), this.years) - 1
      let TEA = aux * 100
      this.TEA = TEA.toFixed(2)
    },

    changeData(i, capitalAux) {
      if (i === 0) {
        this.item.year = i
        this.item.interest = 0
        this.item.amortization = 0
        this.item.capital = this.amount
      } else {
        this.item.year = i
        console.log(i + ' ' + this.item.year)
        this.item.interest = (capitalAux * this.rate / 100).toFixed(2)
        console.log(i + ' ' + this.item.interest)
        this.item.amortization = (this.payment - this.item.interest).toFixed(2)
        console.log(i + ' ' + this.item.amortization)
        this.item.capital = (capitalAux - this.item.amortization).toFixed(2)
        console.log(i + ' ' + this.item.capital)
      }
    },

    getTableArray() {
      let capitalAux = 0
      for (let i = 0; i <= this.years; i++) {
        this.changeData(i, capitalAux)
        capitalAux = this.item.capital
        this.results.push(this.item)
      }
      console.log(this.results)
    },
  },

  async mounted() {
    await this.divisaList()
  },
}
</script>
