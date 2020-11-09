<template>
  <v-container class="mt-11">
    <div class="d-flex justify-space-between mb-3 align-end">
      <h3 class="text-subtitle-1 font-weight-bold">
        <v-icon color="black">mdi-format-list-text</v-icon> Gestión de Cursos
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
              @click="
                CHANGE_STATE_DIALOG({ code: 'dialogCurso', value: true })
                Curso = {}
              "
            >
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Añadir Curso</span>
        </v-tooltip>
      </div>
    </div>
    <v-card elevation="7">
      <v-data-table
        class="curso-table curso"
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
                color="primary darken-1 "
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
            <span>Eliminar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialogCurso" persistent :max-width="600">
        <v-card>
          <v-card-title class="primary darken-2 white--text"
            >Añadir Curso</v-card-title
          >
          <v-container fluid class="px-8">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.nombre"
                  label="Nombre"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.descripcion"
                  label="Descripción"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="Curso.codigoInterno"
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
              <v-btn color="primary darken-1" class="mx-1" @click="saveCurso()">
                <span class="text-capitalice">Guardar</span>
              </v-btn>
              <v-btn
                color="secondary"
                class="mx-1"
                @click="
                  CHANGE_STATE_DIALOG({ code: 'dialogCurso', value: false })
                  Curso = {}
                "
              >
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
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('configuracion/listarCursos')
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Configuración - Cursos',
      subtitle: ''
    })
  },
  data: () => ({
    Curso: {},
    headersCursos: [
      { text: 'ID', value: 'cursoId', sortable: false },
      { text: 'Institución', value: 'institucion', sortable: false },
      { text: 'Nombre', value: 'nombre', sortable: false },
      { text: 'Descripción', value: 'descripcion', sortable: false },
      { text: 'Codigo', value: 'idInterno', sortable: false },
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
    ]
  }),
  computed: {
    ...mapState({
      listaCursos: (state) =>
        JSON.parse(JSON.stringify(state.configuracion.listaCursos))
    }),
    ...mapGetters('configuracion', ['dialogCurso'])
  },
  methods: {
    ...mapMutations('configuracion', ['CHANGE_STATE_DIALOG']),
    cambiarEstado(item) {
      console.log('Cambiar el estado del curso', item.status)
    },

    configurarSecciones(item) {
      this.$router.push(`/configuracion/cursos/${item.id}/secciones`)
    },

    saveCurso(item) {
      const data = this.Curso
      data.idInstitucion = this.$store.state.auth.user.idInstitucion
      this.$store.dispatch('configuracion/saveCurso', data)
    },

    editarInstitucion(item) {
      this.CHANGE_STATE_DIALOG({ code: 'dialogCurso', value: true })
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
