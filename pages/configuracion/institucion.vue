<template>
  <v-container class="mt-11">
    <div class="d-flex justify-space-between mb-3 align-end">
      <h3 class="text-subtitle-1 font-weight-bold">
        <v-icon color="black">mdi-format-list-text</v-icon> Lista de
        Instituciones
      </h3>
      <div>
        <v-tooltip top>
          <template v-slot:activator="on">
            <v-btn
              class="px-1 rounded-circle"
              :min-width="0"
              height="50"
              width="50"
              color="primary"
              v-on="on"
              @click="modalForm = true"
            >
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Añadir Institución</span>
        </v-tooltip>
      </div>
    </div>

    <v-card elevation="7">
      <v-data-table
        class="curso-table curso"
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
                depressed
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
                depressed
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
                @click="saveInstitucion()"
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
  async fetch({ store }) {
    await store.dispatch('configuracion/listarInstituciones')
    await store.commit('CHANGE_PAGE_TITLE', 'Configuración')
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Configuración - Institución',
      subtitle: ''
    })
  },
  data: () => ({
    Institucion: {},
    headersInstitucion: [
      { text: 'Logo', value: 'logo', sortable: false },
      { text: 'Nombre', value: 'nombre', sortable: false, width: 200 },
      { text: 'Descripción', value: 'descripcion', sortable: false },
      { text: 'Tipo', value: 'tipoInstitucion', sortable: false },
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
      { id: 0, name: 'Universidad' },
      { id: 1, name: 'Colegio' },
      { id: 2, name: 'Liceo' },
      { id: 3, name: 'Escuela' },
      { id: 4, name: 'Instituto' },
      { id: 5, name: 'CFT' },
      { id: 6, name: 'IP' },
      { id: 7, name: 'Otro' }
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
    saveInstitucion() {
      this.$store.dispatch('configuracion/saveInstitucion', this.Institucion)
      this.modalForm = false
    },
    editarInstitucion(item) {
      this.modalForm = true
      this.Institucion = item
    },
    deleteInstitucion(index, item) {
      this.listaInstitucion.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
