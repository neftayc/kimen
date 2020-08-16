<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <div>
        <h2 class="title">Desempeño de Estudiantes</h2>
        <p>Curso</p>
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
      :headers="headerProyectoCurso"
      :items="headerProyectoCursoItems"
      hide-default-footer
    >
    </v-data-table>
    <br />
    <br />

    <h2 class="title">Información General</h2>
    <p>Lista de Estudiantes</p>
    <v-data-table
      class="curso-table"
      :headers="headerEstudiantesCurso"
      :items="listaJugadores"
      hide-default-footer
    >
      <template v-slot:item.fullname="{ item }">
        {{ item.apPat }} {{ item.apMat }} {{ item.nombre }}
      </template>
      <template v-slot:item.kpiT1="{ item }">
        <v-badge
          v-if="item.kpiT1 != 0"
          left
          inline
          :color="getColor(item.kpiT1)"
          dot
        >
          <span>{{ item.kpiT1 }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.kpiT2="{ item }">
        <v-badge
          v-if="item.kpiT2 != 0"
          left
          inline
          :color="getColor(item.kpiT2)"
          dot
        >
          <span>{{ item.kpiT2 }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.kpiT3="{ item }">
        <v-badge
          v-if="item.kpiT3 != 0"
          left
          inline
          :color="getColor(item.kpiT3)"
          dot
        >
          <span>{{ item.kpiT3 }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.kpiT="{ item }">
        <v-badge
          v-if="item.kpiT != 0"
          left
          inline
          :color="getColor(item.kpiT)"
          dot
        >
          <span>{{ item.kpiT }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.performance><chart /> </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip top color="grey darken-2">
          <template v-slot:activator="{ on }">
            <v-btn
              min-width="0"
              class="px-2 mx-1"
              small
              depressed
              color="accent lighten-1"
              @click="goToDesempenho(item)"
              v-on="on"
            >
              <v-icon small>mdi-account-star</v-icon>
            </v-btn>
          </template>
          <span>Desempeño Individual</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, params }) {
    await store.dispatch('jugadores/listProyectosCurso', params.idCurso)
    await store.dispatch('jugadores/listJugadores', params.idCurso)
  },
  data: () => ({
    headerProyectoCurso: [
      { text: 'Universidad', value: 'nombreUniversidad', sortable: false },
      { text: 'Curso', value: 'nombreCurso', sortable: false },
      {
        text: '# Estudiantes',
        value: 'cantJugador',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Periodo',
        value: 'periodoCurso',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Proyecto 1',
        value: 'nP1',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Proyecto 2',
        value: 'nP2',
        sortable: false,
        align: 'center'
      },
      { text: 'Proyecto 3', value: 'nP3', sortable: false, align: 'center' },
      { text: 'Proyecto 4', value: 'nP3', sortable: false, align: 'center' },
      { text: 'Proyecto 5', value: 'nP3', sortable: false, align: 'center' },
      { text: 'Proyecto 6', value: 'nP3', sortable: false, align: 'center' },
      { text: 'Proyecto 7', value: 'nP3', sortable: false, align: 'center' }
    ],
    headerEstudiantesCurso: [
      { text: 'Apellidos y Nombres', value: 'fullname', sortable: false },
      { text: 'Id Estudiante', value: 'id', sortable: false, align: 'center' },
      {
        text: 'KPI Proyecto 1',
        value: 'kpiT1',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Proyecto 2',
        value: 'kpiT2',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Proyecto 3',
        value: 'kpiT3',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Proyecto 4',
        value: 'kpiT4',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Proyecto 5',
        value: 'kpiT5',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Proyecto 6',
        value: 'kpiT6',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Proyecto 7',
        value: 'kpiT7',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Total Promedio',
        value: 'kpiT',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Performance',
        value: 'performance',
        sortable: false,
        align: 'center',
        width: 120
      },
      { text: 'Acciones', value: 'actions', sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      headerProyectoCursoItems: (state) =>
        state.jugadores.headerProyectoCursoItems,
      listaJugadores: (state) => state.jugadores.listaJugadores
    })
  },
  methods: {
    getColor(x) {
      if (x >= 85) return '#2BBE21'
      else if (x >= 60 && x < 85) return '#ffdf00'
      else if (x < 60) return '#D62D2D'
    },
    goToDesempenho(item) {
      this.$router.push(`/estudiantes/${item.id}/desempenho-individual`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
