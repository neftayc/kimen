<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="white">
        <v-toolbar-title>Gestión de Cursos</v-toolbar-title>

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
          <span>Anadir Curso</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        hide-default-footer
        :headers="headersCursos"
        :items="listaCursos"
      >
        <template v-slot:item.secctions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                dark
                color="primary darken-1"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="configurarSecciones(item)"
              >
                <v-icon small> mdi-cogs</v-icon>
              </v-btn>
            </template>
            <span> Configurar Secciones</span>
          </v-tooltip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-tooltip top :color="item.status ? 'green' : 'red'">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                dark
                depressed
                :color="item.status ? 'green' : 'red'"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="cambiarEstado(item)"
              >
                <v-icon small>{{
                  item.status ? 'mdi-check' : 'mdi-minus'
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{
              item.status ? 'Desactivar Curso' : 'Activar Curso'
            }}</span>
          </v-tooltip>
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
                depressed
                small
                color="error"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="deleteInstitucion(listaCursos.indexOf(item), item)"
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
            >Añadir Curso</v-card-title
          >
          <v-container fluid class="px-8">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.name"
                  label="Nombre"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.description"
                  label="Descripción"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.codigo"
                  label="Código"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.area"
                  label="Área"
                  outlined
                ></v-text-field>
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
  async fetch({ store }) {
    await store.dispatch('configuracion/listarCursos')
    await store.commit('CHANGE_PAGE_TITLE', 'Configuración')
  },
  data: () => ({
    Curso: {},
    headersCursos: [
      { text: 'ID', value: 'id', sortable: false },
      { text: 'Institución', value: 'institucion', sortable: false },
      { text: 'Nombre', value: 'name', sortable: false, width: 200 },
      { text: 'Descripción', value: 'description', sortable: false },
      { text: 'Codigo', value: 'codigo', sortable: false },
      { text: 'Área', value: 'area', sortable: false },
      { text: 'Estado', value: 'status', sortable: false },
      {
        text: 'Configurar Secciones',
        value: 'secctions',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Accions',
        value: 'actions',
        sortable: false,
        align: 'center',
        width: 150
      }
    ],
    modalForm: false
  }),
  computed: {
    ...mapState({
      listaCursos: (state) =>
        JSON.parse(JSON.stringify(state.configuracion.listaCursos))
    })
  },
  methods: {
    cambiarEstado(item) {
      console.log('Cambiar el estado del curso', item.status)
    },

    configurarSecciones(item) {
      this.$router.push(`/configuracion/cursos/${item.id}/secciones`)
    },

    editarInstitucion(item) {
      this.modalForm = true
      this.Curso = item
    },
    deleteInstitucion(index, item) {
      console.log('====================================')
      console.log(index)
      console.log(item)
      console.log('====================================')
      this.listaCursos.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
