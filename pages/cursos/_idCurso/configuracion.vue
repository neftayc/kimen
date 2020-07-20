<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <div>
        <h2>Configuración de Curso</h2>
        <p>Registro de Cursos</p>
      </div>
      <div>
        <v-tooltip top color="grey darken-2">
          <template v-slot:activator="{ on }">
            <v-icon
              color="primary darken-3"
              x-large
              v-on="on"
              @click="$router.go(-1)"
            >
              mdi-arrow-left-circle
            </v-icon>
          </template>
          <span>Regresar</span>
        </v-tooltip>
      </div>
    </div>
    <v-data-table
      class="curso-table"
      :headers="headerConfiguration"
      :items="cursoSelected"
      hide-default-footer
    ></v-data-table>

    <v-stepper v-model="stepModel" alt-labels flat transparent tile>
      <v-stepper-header flat>
        <v-stepper-step step="1" editable>
          <span class="text-center subtitle-2">Asignación de Profesores</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable>
          <span class="text-center subtitle-2">Escala de Notas</span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>
          Datos Proyectos
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container fluid>
            <v-row align="center">
              <v-col cols="12" sm="4">
                <p class="ma-0">Seleccione Profesor 1</p>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  :items="profesoresUniversitarios"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <v-btn outlined color="primary" height="40">
                  <span class="text-capitalize subtitle-2">
                    Asignar Profesores
                  </span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <p class="ma-0">Seleccione Profesor 2</p>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  :items="profesoresUniversitarios"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <v-btn outlined color="primary" height="40">
                  <span class="text-capitalize subtitle-2">
                    Asignar Profesores
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container>
            <v-row align="center">
              <v-col cols="12" sm="3" md="3" lg="2" class="pb-0 pb-sm-3">
                <p class="ma-0">Nota Mínima</p>
              </v-col>
              <v-col cols="6" sm="3" md="3" lg="2" offset-sm="1" offset-lg="2">
                <v-text-field
                  v-model="notasCursoTemp.notaMin"
                  type="number"
                  dense
                  outlined
                  hide-details
                  width="100"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="3"
                md="3"
                lg="2"
                offset-sm="1"
                offset-lg="2"
                class="d-flex align-center justify-end"
              >
                <v-text-field
                  v-model="notasCursoTemp.porceMin"
                  style="direction: rtl;"
                  type="number"
                  dense
                  outlined
                  hide-details
                  width="100"
                ></v-text-field
                >%
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="3" md="3" lg="2" class="pb-0 pb-sm-3">
                <p class="ma-0">Nota Aprobatoria</p>
              </v-col>
              <v-col cols="6" sm="3" md="3" lg="2" offset-sm="1" offset-lg="2">
                <v-text-field
                  v-model="notasCursoTemp.notaApr"
                  type="number"
                  dense
                  outlined
                  hide-details
                  width="100"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="3"
                md="3"
                lg="2"
                offset-sm="1"
                offset-lg="2"
                class="d-flex align-center justify-end"
              >
                <v-text-field
                  v-model="notasCursoTemp.porceApr"
                  style="direction: rtl;"
                  type="number"
                  dense
                  outlined
                  hide-details
                  width="100"
                ></v-text-field
                >%
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="3" md="3" lg="2" class="pb-0 pb-sm-3">
                <p class="ma-0">Nota Máxima</p>
              </v-col>
              <v-col cols="6" sm="3" md="3" lg="2" offset-sm="1" offset-lg="2">
                <v-text-field
                  v-model="notasCursoTemp.notaMax"
                  type="number"
                  dense
                  outlined
                  hide-details
                  width="100"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="3"
                md="3"
                lg="2"
                offset-sm="1"
                offset-lg="2"
                class="d-flex align-center justify-end"
              >
                <v-text-field
                  v-model="notasCursoTemp.porceMax"
                  type="number"
                  dense
                  outlined
                  hide-details
                  width="100"
                  style="direction: rtl;"
                ></v-text-field
                >%
              </v-col>
            </v-row>
            <div class="d-flex justify-center">
              <v-btn outlined color="primary" class="mx-1" @click="modNotas()">
                <span class="subtitle-2 text-capitalize font-weight-bold">
                  Asignar Notas
                </span>
              </v-btn>
              <v-btn outlined color="accent " class="mx-1">
                <span class="subtitle-2 text-capitalize font-weight-bold">
                  Modificar Notas
                </span>
              </v-btn>
            </div>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="3"></v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  async fetch({ store, params }) {
    await store.dispatch('cursos/selectCurso', params.idCurso)
    await store.dispatch('cursos/listNotas', params.idCurso)
  },
  data: () => ({
    stepModel: null,
    headerConfiguration: [
      { text: 'Universidad', value: 'universidadNombre', sortable: false },
      { text: 'Curso', value: 'nombre', sortable: false },
      { text: '# Estudiantes', value: 'contJugadores', sortable: false },
      { text: 'Sección', value: 'seccion', sortable: false },
      { text: 'Periodo', value: 'periodo', sortable: false }
    ],
    notasCursoTemp: {}
  }),
  computed: {
    ...mapState({
      cursoSelected: (state) => state.cursos.cursoSelected,
      profesoresUniversitarios: (state) =>
        state.cursos.profesoresUniversitarios,
      notasCurso: (state) => state.cursos.notasCurso
    }),
    ...mapGetters('cursos', ['notasCursoG'])
  },
  mounted() {
    console.log(this.notasCurso)
    this.notasCursoTemp = JSON.parse(JSON.stringify(this.notasCurso))
    console.log('====================================', this.notasCursoTemp)
  },
  beforeDestroy() {
    this.$store.commit('cursos/SET_LISTAR_NOTAS', {})
  },
  methods: {
    modNotas() {
      const d = {
        cursoId: parseInt(this.notasCursoTemp.cursoId),
        notaApr: parseInt(this.notasCursoTemp.notaApr),
        notaMax: parseInt(this.notasCursoTemp.notaMax),
        notaMin: parseInt(this.notasCursoTemp.notaMin),
        porceApr: parseInt(this.notasCursoTemp.porceApr),
        porceMax: parseInt(this.notasCursoTemp.porceMax),
        porceMin: parseInt(this.notasCursoTemp.porceMin)
      }
      this.$store.dispatch('cursos/updateNotas', d)
    }
  }
}
</script>

<style lang="scss" scoped></style>
