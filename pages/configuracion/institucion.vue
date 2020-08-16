<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="white">
        <v-toolbar-title>Instituciones</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="on">
            <v-btn
              depressed
              class="px-1"
              small
              :min-width="0"
              color="primary"
              v-on="on"
              @click="modalForm = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Anadir Institución</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        hide-default-footer
        :headers="headersInstitucion"
        :items="listaInstitucion"
      >
        <template v-slot:item.logo>
          <v-avatar :size="70">
            <v-img :src="require('@/static/logo.png')" />
          </v-avatar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                color="info"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="editarInstitucion(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                color="error"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="deleteInstitucion(listaInstitucion.indexOf(item), item)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Elimanar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="modalForm" persistent :max-width="600">
        <v-card>
          <v-card-title class="primary darken-2 white--text"
            >Añadir Institución</v-card-title
          >
          <v-container fluid class="px-8">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="Institucion.name"
                  label="Nombre"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="Institucion.description"
                  label="Descripción"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="Institucion.type"
                  label="Tipo"
                  :items="listaTipos"
                  item-text="name"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="Institucion.pais"
                  label="País"
                  :items="listaPaises"
                  item-text="name"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <div class="d-flex justify-center">
              <v-btn
                color="primary darken-1"
                class="mx-1"
                @click="modalForm = false"
              >
                <span class="text-capitalice">Guardar</span>
              </v-btn>
              <v-btn color="secondary" class="mx-1" @click="modalForm = false">
                <span class="text-capitalice">Cancelar</span>
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    Institucion: {},
    headersInstitucion: [
      { text: 'Logo', value: 'logo', sortable: false },
      { text: 'Nombre', value: 'name', sortable: false, width: 200 },
      { text: 'Descripción', value: 'description', sortable: false },
      { text: 'Tipo', value: 'type', sortable: false },
      { text: 'País', value: 'pais', sortable: false },
      {
        text: 'Accions',
        value: 'actions',
        sortable: false,
        align: 'center',
        width: 150
      }
    ],
    listaTipos: [
      { id: 1, name: 'Colegio' },
      { id: 2, name: 'Universidad' },
      { id: 3, name: 'Escuela' },
      { id: 4, name: 'Instituto' }
    ],
    listaPaises: [
      { id: 1, name: 'Perú' },
      { id: 2, name: 'Bolivia' },
      { id: 3, name: 'Chile' },
      { id: 4, name: 'España' },
      { id: 4, name: 'Colombia' }
    ],
    modalForm: false
  }),
  computed: {
    ...mapState({
      listaInstitucion: (state) =>
        JSON.parse(JSON.stringify(state.configuracion.listaInstitucion))
    })
  },
  methods: {
    editarInstitucion(item) {
      this.modalForm = true
      this.Institucion = item
    },
    deleteInstitucion(index, item) {
      console.log('====================================')
      console.log(index)
      console.log(item)
      console.log('====================================')
      this.listaInstitucion.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
