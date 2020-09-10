<template>
  <v-container v-if="EstudianteSeleccionado.kpiProyectos" fluid>
    <v-card class="pa-1" flat tile>
      <div class="d-flex justify-space-between">
        <div>
          <p class="font-weight-medium">
            Detalle del Estudiante: {{ EstudianteSeleccionado.nombreApellido }}
          </p>
          <div class="text-subtitle-1">
            <strong>Curso:</strong> {{ cursoSeleccionado.nombre }} -
            {{ cursoSeleccionado.seccion }}
          </div>
          <p class="text-caption grey--text text--darken-2">
            {{ cursoSeleccionado.descripcion }}
          </p>
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
        class="curso-table tableEstudiante"
        :headers="headerProyectosJugador"
        :items="EstudianteSeleccionado.kpiProyectos"
        hide-default-footer
        dense
      >
        <template v-slot:item.nombre="{ item }">
          <div style="line-height: 1;" class="py-1">
            <span
              style="line-height: 1.1;"
              class="d-block text-caption font-weight-medium"
            >
              {{ item.id }} - {{ item.nombre }}
            </span>
            <small class="grey--text">{{ item.tipoProyecto }}</small>
          </div>
        </template>
        <template v-slot:item.estado="{ item }">
          <v-chip
            small
            :color="item.finalizado ? 'grey' : 'primary'"
            outlined
            class="font-weight-bold"
          >
            {{ item.finalizado ? 'Finalizado' : 'En proceso' }}
          </v-chip>
        </template>
        <template v-slot:item.kpiCrono="{ item }">
          <v-badge
            v-if="!item.finalizado ? item.kpiProyecto.kpiPlazoAdquirido : true"
            left
            inline
            :color="getColor(item.kpiProyecto.kpiPlazoAdquirido)"
            dot
          >
            <span>{{ item.kpiProyecto.kpiPlazoAdquirido }}%</span>
          </v-badge>
        </template>
        <template v-slot:item.kpiCosto="{ item }">
          <v-badge
            v-if="!item.finalizado ? item.kpiProyecto.kpiCostoAdquirido : true"
            left
            inline
            :color="getColor(item.kpiProyecto.kpiCostoAdquirido)"
            dot
          >
            <span>{{ item.kpiProyecto.kpiCostoAdquirido }}%</span>
          </v-badge>
        </template>
        <template v-slot:item.kpiSatis="{ item }">
          <v-badge
            v-if="
              !item.finalizado
                ? item.kpiProyecto.kpiSatisfaccionAdquirido
                : true
            "
            left
            inline
            :color="getColor(item.kpiProyecto.kpiSatisfaccionAdquirido)"
            dot
          >
            <span>{{ item.kpiProyecto.kpiSatisfaccionAdquirido }}%</span>
          </v-badge>
        </template>
        <template v-slot:item.kpiTotal="{ item }">
          <v-badge
            v-if="!item.finalizado ? item.kpiTotal : true"
            left
            inline
            :color="getColor(item.kpiTotal)"
            dot
          >
            <span>{{ item.kpiTotal }}%</span>
          </v-badge>
        </template>

        <template v-slot:item.tiempoJuego="{ item }">
          <span>{{ getTime(item.tiempoTotalSegundos) }}</span>
        </template>
      </v-data-table>
      <v-data-table
        :headers="[
          { sortable: false },
          {
            value: 'nombre',
            sortable: false,
            align: 'center',
            width: 100,
            class: 'name-total'
          },
          {
            text: 'KPI Total',
            value: 'kpiTotal',
            sortable: false,
            align: 'center',
            width: 100
          },
          {
            text: 'Tiempo de Juego (hh:mm)',
            value: 'tiempoFinal',
            sortable: false,
            align: 'center',
            width: 160
          }
        ]"
        :items="[resumen]"
        hide-default-footer
        :headers-length="5"
        class="curso-table table-summary mt-11"
        dense
      >
        <template v-slot:item.nombre>
          <span class="title">Total</span>
        </template>

        <template v-slot:item.kpiTotal>
          <v-badge
            left
            inline
            :color="getColor(EstudianteSeleccionado.kpiPromedioTotal)"
            dot
          >
            <span>{{ EstudianteSeleccionado.kpiPromedioTotal }}%</span>
          </v-badge>
        </template>

        <template v-slot:item.tiempoFinal>
          <span>{{ getTotalTime() }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  async fetch({ store, params }) {
    await store.dispatch('cursos/getCurso', params.idCurso)

    await store.dispatch('cursos/selectSeccionCurso', params.idCurso)
    await store.commit('CHANGE_PAGE_TITLE', 'Curso - Desempeño Individual')
  },

  data: () => ({
    headerProyectosJugador: [
      { text: '', value: 'nombre', sortable: false },
      {
        text: 'Estado',
        value: 'estado',
        sortable: false,
        width: 100,
        align: 'center'
      },
      {
        text: 'KPI Cronograma',
        value: 'kpiCrono',
        sortable: false,
        align: 'center'
      },

      {
        text: 'KPI Costo',
        value: 'kpiCosto',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Satisfacción',
        value: 'kpiSatis',
        sortable: false,
        align: 'center'
      },
      {
        text: 'KPI Total',
        value: 'kpiTotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Tiempo de Juego (hh:mm)',
        value: 'tiempoJuego',
        sortable: false,
        align: 'center',
        width: 160
      }
    ]
  }),
  computed: {
    ...mapState({
      cursoSeleccionado: (state) => state.cursos.cursoSeleccionado
    }),
    ...mapGetters('jugadores', ['resumen', 'jugadorData']),
    EstudianteSeleccionado() {
      const d = this.$store.state.cursos.seccionCursoSelected.find(
        (x) => x.idEstudiante === parseInt(this.$route.params.idEstudiante)
      )
      return d ?? {}
    }
  },
  methods: {
    getColor(x) {
      if (x >= 85) return '#2BBE21'
      else if (x >= 60 && x < 85) return '#ffdf00'
      else if (x < 60) return '#D62D2D'
    },
    // time in seconds
    getTime(time) {
      const hour = Math.floor(time / 3600)
      const hourTemp = hour < 10 ? '0' + hour : hour

      const minute = Math.floor((time / 60) % 60)
      const minuteTemp = minute < 10 ? '0' + minute : minute

      const second = time % 60
      const secondTemp = second < 10 ? '0' + second : second
      return hourTemp + ':' + minuteTemp + ':' + secondTemp
    },
    getTotalTime() {
      const time = this.EstudianteSeleccionado.kpiProyectos.reduce(
        (x, y) => x + y.tiempoTotalSegundos,
        0
      )
      console.log('===', time)
      return this.getTime(time)
    }
  }
}
</script>

<style lang="scss">
.tableEstudiante {
  & .v-data-table-header {
    & tr th:first-child {
      background: white;
    }
  }
  & tbody {
    & tr td:first-child {
      background: var(--v-primary-darken1);
      color: white;
    }
  }
}
.table-summary {
  th {
    border: 0 !important;
    background: var(--v-primary-darken1);
    color: white !important;
  }
  th:first-child {
    background: white !important;
  }
  tr:hover {
    background: transparent !important;
  }
  & tbody {
    tr td {
      height: 55px !important;
    }
    tr td:nth-child(2) {
      background: var(--v-primary-darken1);
      color: white;
    }
  }
}
</style>
