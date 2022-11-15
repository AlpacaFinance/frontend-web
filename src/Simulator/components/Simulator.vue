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
              ¿Con qué divisa deseas realizar la simulación?
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
              ¿Cúal es el importe que deseas simular?

            <v-text-field
                v-model="amount"
                :rules="importRules"
                placeholder="S/ 0.00"
                label="Importe"
                required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <!-- Selector de Tasa de Interés -->
          <v-col cols="6">
              ¿Cúal es el tipo de la tasa de interés?
            <v-select
                v-model="select"
                :items="items"
                :error-messages="errors"
                label="Select"
                data-vv-name="select"
                required
            ></v-select>
          </v-col>

          <!-- Tasa de interés -->
          <v-col>
              ¿Cúal es la tasa de interés?
            <v-text-field
                v-model="rate"
                :rules="rateRules"
                label="Tasa"
                placeholder="0%"
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
  export default {
    name: 'Simulator',
    data: () => ({
      divisa:false,
      valid:false,
      amount: '',
      amountRules: [
        v => !!v || 'Import is required',
      ],
      rate: '',
      rateRules: [
        v => !!v || 'Import is required',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],

      // Periodo de Gracia
      gracePeriodHeaders: [
        { text: 'Periodo', value: 'period', sortable: false },
        { text: 'Deuda inicial del mes', value: 'initialDebt', sortable: false },
        { text: 'Factor mensual', value: 'monthlyFactor', sortable: false },
        { text: 'Deuda antes del pago', value: 'previousDebt', sortable: false },
        { text: 'Pago del mes', value: 'monthlyPayment', sortable: false },
        { text: 'Deuda final del mes', value: 'finalDebt', sortable: false },
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
        { text: 'Operacion', value: 'operation', sortable: false },
        { text: 'Importe', value: 'amount', sortable: false },
      ],
      operatingActivities: [
        {
          operation: 'Juice',
          amount: 749,
        },
      ],

      // Actividades Financieras
      financialActivityHeaders: [
        { text: 'Operacion', value: 'operation', sortable: false },
        { text: 'Importe', value: 'amount', sortable: false },
      ],
      financialActivities: [
        {
          operation: 'Ice Cream',
          amount: 189,
        },
      ],

      // Actividades de Inversión
      investmentActivityHeaders: [
        { text: 'Operacion', value: 'operation', sortable: false },
        { text: 'Importe', value: 'amount', sortable: false },
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
  }
</script>
