<template>
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
            <v-sheet>
              <v-switch
                  v-model="divisa"
                  inset
                  :label="`Divisa: ${messages}`"
              ></v-switch>
            </v-sheet>
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
                clearable
                label="Importe"
                required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <!-- Selector de Tasa de Interés -->
          <v-col cols="6">
            <p class="text-left">
              ¿Cúal es el tipo de la tasa de interés?
            </p>
            <v-select
                v-model="select"
                :items="rateType"
                :error-messages="errors"
                label="Tasa de Interés"
                data-vv-name="select"
                required
            ></v-select>
          </v-col>

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
                clearable
                required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Periodos de Gracia -->
        <v-row>
          <v-card-subtitle class="subtitle-1 font-weight-bold">
            Periodo de Gracia
          </v-card-subtitle>
        </v-row>

        <v-row>
          <v-container>
            <v-card
                class="pa-5 rounded-xl">
              <v-data-table
                  hide-default-footer
                  :headers="gracePeriodHeaders"
                  :items="gracePeriods"
              ></v-data-table>
            </v-card>
          </v-container>
        </v-row>

        <!-- Estado de Flujo de Caja -->
        <v-row>
          <v-card-subtitle class="subtitle-1 font-weight-bold">
            Estado de Flujo de Caja
          </v-card-subtitle>
        </v-row>

        <!-- Actividades de Operación -->
        <v-row>
          <v-container>
            <v-card
                class="pa-5 rounded-xl">
              <v-card-title>
                Actividades de Operación
              </v-card-title>
              <v-data-table
                  hide-default-footer
                  :headers="operatingActivityHeaders"
                  :items="operatingActivities"
              ></v-data-table>
            </v-card>
          </v-container>
        </v-row>

        <!-- Actividades Financieras -->
        <v-row>
          <v-container>
            <v-card
                class="pa-5 rounded-xl">
              <v-card-title>
                Actividades Financieras
              </v-card-title>
              <v-data-table
                  hide-default-footer
                  :headers="financialActivityHeaders"
                  :items="financialActivities"
              ></v-data-table>
            </v-card>
          </v-container>
        </v-row>

        <!-- Actividades de Inversión -->
        <v-row>
          <v-container>
            <v-card
                class="pa-5 rounded-xl">
              <v-card-title>
                Actividades de Inversión
              </v-card-title>
              <v-data-table
                  hide-default-footer
                  :headers="investmentActivityHeaders"
                  :items="investmentActivities"
              ></v-data-table>
            </v-card>
          </v-container>
        </v-row>
      </v-container>
    </v-form>

  </v-card>
</template>

<script>
  import {getRateTypeList} from "@/Simulator/services/rateTypeServices";

  export default {
    name: 'SimulatorComponent',
    data: () => ({
      divisa:false,
      valid:false,
      amount: '',
      errors: [],
      amountRules: [
        v => !!v || 'Import is required',
      ],
      rate: '',
      rateRules: [
        v => !!v || 'Rate is required',
      ],
      select: null,
      rateType: [],

      // Periodo de Gracia
      gracePeriodHeaders: [
        { text: 'Periodo', value: 'period', sortable: false, class: 'blue lighten-3' },
        { text: 'Deuda inicial del mes', value: 'initialDebt', sortable: false, class: 'blue lighten-3' },
        { text: 'Factor mensual', value: 'monthlyFactor', sortable: false, class: 'blue lighten-3' },
        { text: 'Deuda antes del pago', value: 'previousDebt', sortable: false, class: 'blue lighten-3' },
        { text: 'Pago del mes', value: 'monthlyPayment', sortable: false, class: 'blue lighten-3' },
        { text: 'Deuda final del mes', value: 'finalDebt', sortable: false, class: 'blue lighten-3' },
      ],
      gracePeriods: [
        {
          period: 'Yogurt',
          initialDebt: 159,
          monthlyFactor: 6.0,
          previousDebt: 24,
          monthlyPayment: 4.0,
          finalDebt: '1%',
        },
      ],

      // Actividades de Operación
      operatingActivityHeaders: [
        { text: 'Operacion', value: 'operation', sortable: false, class: 'blue lighten-3' },
        { text: 'Importe', value: 'amount', sortable: false, class: 'blue lighten-3' },
      ],
      operatingActivities: [
        {
          operation: 'Juice',
          amount: 749,
        },
      ],

      // Actividades Financieras
      financialActivityHeaders: [
        { text: 'Operacion', value: 'operation', sortable: false, class: 'blue lighten-3' },
        { text: 'Importe', value: 'amount', sortable: false, class: 'blue lighten-3' },
      ],
      financialActivities: [
        {
          operation: 'Ice Cream',
          amount: 189,
        },
      ],

      // Actividades de Inversión
      investmentActivityHeaders: [
        { text: 'Operacion', value: 'operation', sortable: false, class: 'blue lighten-3' },
        { text: 'Importe', value: 'amount', sortable: false, class: 'blue lighten-3' },
      ],
      investmentActivities: [
        {
          operation: 'Pie',
          amount: 579,
        },
      ],
    }),
    computed: {
      messages () {
        return this.divisa ? ['Dolares'] : ['Soles']
      },
    },
    methods: {
      /*submit() {
        this.$refs.observer.validate()
      },*/

      async rateTypeList() {
        let result = await getRateTypeList();

        for(let key in result){
          this.rateType.push(result[key]['nameType'])
        }
      },
    },
    async mounted() {
      await this.rateTypeList()
    },
  }
</script>
