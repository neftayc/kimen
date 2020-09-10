<template>
  <v-container fluid>
    <v-card class="px-6">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="3" md="2">
          <v-img
            :style="$vuetify.breakpoint.lgAndUp ? 'width: 80%;' : ''"
            :src="require('@/static/cursoImage.jpg')"
          />
        </v-col>
        <v-col cols="12" sm="9" md="10">
          <h2 class="text-sm-h5 text-md-h4 text-xl-h3">{{ cursoData.name }}</h2>
          <p class="text-subtitle-1">{{ cursoData.description }}</p>
        </v-col>
      </v-row>
    </v-card>
    <br />
    <v-card class="px-1">
      <v-card-title>
        <span class="text-h5">Gestión de Secciones</span>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              depressed
              class="px-1"
              small
              :min-width="0"
              color="primary"
              v-on="on"
              @click="
                CHANGE_STATE_DIALOG({ code: 'dialogCursoSeccion', value: true })
              "
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Anadir Sección Curso</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table
        :headers="headerSeccion"
        :items="listaSecciones"
        hide-default-footer
      >
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
              item.status ? 'Desactivar Sección' : 'Activar Sección'
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
                @click="editarSeccion(item)"
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
                @click="deleteSeccion(listaSecciones.indexOf(item), item)"
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
      <v-dialog v-model="dialogCursoSeccion" persistent :max-width="600">
        <v-card>
          <v-card-title class="primary darken-2 white--text">
            Añadir Curso Sección
          </v-card-title>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('configuracion/listarCursos')
    await store.commit('CHANGE_PAGE_TITLE', 'Configuración - Sección Curso')
  },
  data: () => ({
    Curso: {},
    headerSeccion: [
      {
        text: 'Código Sección Curso',
        value: 'idInterno',
        sortable: false,
        align: 'center',
        width: 150
      },
      { text: 'Descripción', value: 'descripcion', sortable: false },
      { text: 'Fecha Inicio', value: 'fechaInicio', sortable: false },
      { text: 'Fecha Fin', value: 'fechaTermino', sortable: false },
      { text: 'Comentarios', value: 'comment', sortable: false, width: 250 },
      {
        text: 'Estado',
        value: 'status',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Acciones',
        value: 'actions',
        sortable: false,
        align: 'center',
        width: 150
      }
    ]
  }),
  computed: {
    ...mapState({
      cursoData: (state) => state.configuracion.cursoData,
      listaSecciones: (state) =>
        JSON.parse(JSON.stringify(state.configuracion.listaCursos))
    }),
    ...mapGetters('configuracion', ['dialogCursoSeccion'])
  },
  methods: {
    ...mapMutations('configuracion', ['CHANGE_STATE_DIALOG']),
    ...mapActions('configuracion', ['saveCursoSeccion']),
    cambiarEstado(item) {},
    editarSeccion(item) {},
    deleteSeccion(item) {}
  }
}
</script>

<style lang="scss" scoped></style>
