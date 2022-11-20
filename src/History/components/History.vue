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
import {getHistoryByUser} from "@/History/services/HistoryServices";

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
      historyElements: [],
    }
  },

  props: ['id'],

  methods: {
    async operationList() {
      let result = await getHistoryByUser(this.$route.params.id);

      for(let key in result) {
        let operation = {
          infoOperation: result[key]['date'],
          divisa: result[key]['divisa']['nameDivisa'],
          percentage: result[key]['percentage'],
          rateType: result[key]['rateType']['nameType'],
          amount: result[key]['import'],
        }
        this.historyElements.push(operation)
        console.log(this.historyElements)
      }
    },
  },

  created() {
    this.operationList();
  },
}
</script>