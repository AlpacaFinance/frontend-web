<template>
  <v-card
  class="pa-5 rounded-xl">
    <v-card-title>
      Historial de Operaciones
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="historyHeaders"
        :items="historyElements"
        :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'HistoryComponent',
  data () {
    return {
      search: '',
      historyHeaders: [
        { text: 'Información de Operación', value: 'infoOperation', sortable:false, align: 'start' },
        { text: 'Moneda', value: 'divisa', sortable:false },
        { text: 'Tasa de Interés', value: 'percentage', sortable:false },
        { text: 'Tipo de Tasa', value: 'rateType', sortable:false },
        { text: 'Importe', value: 'amount', sortable:false },
      ],
      historyElements: [
        {
          infoOperation: 'Frozen Yogurt',
          divisa: 159,
          percentage: 6.0,
          rateType: 24,
          amount: 4.0,
        },
        {
          infoOperation: 'Ice cream sandwich',
          divisa: 237,
          percentage: 9.0,
          rateType: 37,
          amount: 4.3,
        },
        {
          infoOperation: 'Eclair',
          divisa: 262,
          percentage: 16.0,
          rateType: 23,
          amount: 6.0,
        },
        {
          infoOperation: 'Cupcake',
          divisa: 305,
          percentage: 3.7,
          rateType: 67,
          amount: 4.3,
        },
        {
          infoOperation: 'Gingerbread',
          divisa: 356,
          percentage: 16.0,
          rateType: 49,
          amount: 3.9,
        },
      ],
    }
  },
}
</script>