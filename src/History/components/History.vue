<template>
  <v-card
      class="pa-5 rounded-xl">
    <v-data-table
        :headers="historyHeaders"
        :items="historyElements"
        :search="search"
        sort-by="calories"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>Historial de Operaciones</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on:click="goSimulator"
              >
                Nuevo
              </v-btn>
            </template>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5">¿Estás seguro de querer eliminar esta operación?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {deleteOperation, getHistoryByUser} from "@/History/services/HistoryServices";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    auxId: '',
    search: '',
    historyHeaders: [
      { text: 'Información de Operación', value: 'infoOperation', sortable:false, align: 'start', class: 'blue lighten-3' },
      { text: 'Moneda', value: 'divisa', sortable:false, class: 'blue lighten-3' },
      { text: 'Tasa de Interés', value: 'percentage', sortable:false, class: 'blue lighten-3' },
      { text: 'Tipo de Tasa', value: 'rateType', sortable:false, class: 'blue lighten-3' },
      { text: 'Importe', value: 'amount', sortable:false, class: 'blue lighten-3' },
      { text: ' ', value: 'actions', sortable: false, class: 'blue lighten-3' },
    ],
    historyElements: [],
    index: -1,
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {
    async operationList() {
      let result = await getHistoryByUser(this.$route.params.id);

      for(let key in result) {
        let operation = {
          operationId: result[key]['id'],
          infoOperation: result[key]['date'],
          divisa: result[key]['divisa']['nameDivisa'],
          percentage: result[key]['percentage'],
          rateType: result[key]['rateType']['nameType'],
          amount: result[key]['import'],
        }
        this.historyElements.push(operation)
      }
    },

    deleteItem (item) {
      this.index = item.operationId
      console.log(this.index)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      deleteOperation(this.index)
      this.operationList();
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
    },

    goSimulator() {
      this.$router.push({name: 'simulator', params: {id:this.auxId}})
    },
  },

  created () {
    this.operationList();
  },

  mounted() {
    this.auxId = this.$route.params.id
  },
}
</script>