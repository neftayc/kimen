<template>
  <v-container fluid>
    <div
      text
      style="cursor: pointer;"
      class="black--text font-weight-bold"
      @click="$router.go(-1)"
    >
      <v-icon color="primary darken-3" large>
        mdi-chevron-left
      </v-icon>
      Atrás
    </div>
    <v-container v-if="EstudianteSeleccionado.kpiProyectos">
      <div class="text-center">
        <p class="mb-6">
          <span class="font-weight-medium">Detalle del Estudiante:</span>
          {{ EstudianteSeleccionado.nombreApellido }}
        </p>
      </div>
      <v-card :elevation="18" class="rounded">
        <v-data-table
          class="curso-table"
          :headers="headerProyectosJugador"
          :items="EstudianteSeleccionado.kpiProyectos"
          hide-default-footer
        >
          <template v-slot:item.nombre="{ item }">
            <div style="line-height: 1;" class="py-1">
              <span style="line-height: 1.1;" class="d-block">
                {{ item.nombre }}
                <span class="text-caption primary--text font-weight-medium">
                  {{ item.tipoProyecto }}
                </span>
              </span>
            </div>
          </template>
          <template v-slot:item.kpiCrono="{ item }">
            <ItemProjectKPI
              :estado="item.finalizado"
              :kpi-total="item.kpiProyecto.kpiPlazoAdquirido"
              :kpi="item.kpiProyecto.kpiPlazoAdquirido"
            />
          </template>
          <template v-slot:item.kpiCosto="{ item }">
            <ItemProjectKPI
              :estado="item.finalizado"
              :kpi-total="item.kpiProyecto.kpiCostoAdquirido"
              :kpi="item.kpiProyecto.kpiCostoAdquirido"
            />
          </template>
          <template v-slot:item.kpiSatis="{ item }">
            <ItemProjectKPI
              :estado="item.finalizado"
              :kpi-total="item.kpiProyecto.kpiSatisfaccionAdquirido"
              :kpi="item.kpiProyecto.kpiSatisfaccionAdquirido"
            />
          </template>
          <template v-slot:item.kpiTotal="{ item }">
            <ItemProjectKPI
              :estado="item.finalizado"
              :kpi-total="item.kpiTotal"
              :kpi="item.kpiTotal"
            />
          </template>

          <template v-slot:item.tiempoJuego="{ item }">
            <span>{{ getTime(item.tiempoTotalSegundos) }}</span>
          </template>
        </v-data-table>
        <v-data-table
          :headers="[
            { sortable: false },
            {
              text: 'KPI Total',
              value: 'kpiTotal',
              sortable: false,
              align: 'center',
              width: 200
            },
            {
              text: 'Tiempo de Juego (hh:mm)',
              value: 'tiempoFinal',
              sortable: false,
              align: 'center',
              width: 300
            }
          ]"
          :items="[resumen]"
          hide-default-footer
          :headers-length="5"
          class="curso-table table-summary"
          dense
        >
          <template v-slot:item.nombre>
            <span class="title">Total</span>
          </template>

          <template v-slot:item.kpiTotal>
            <ItemProjectKPI
              :estado="true"
              :kpi-total="EstudianteSeleccionado.kpiPromedioTotal"
              :kpi="EstudianteSeleccionado.kpiPromedioTotal"
            />
          </template>

          <template v-slot:item.tiempoFinal>
            <span>{{ getTotalTime() }}</span>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemProjectKPI from '@/components/ItemProjectKPI'

export default {
  components: { ItemProjectKPI },

  async fetch({ store, params }) {
    await store.dispatch('cursos/getCurso', params.idCurso)

    await store.dispatch('cursos/selectSeccionCurso', params.idCurso)
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Desempeño Individual',
      subtitle:
        'Curso: ' +
        store.state.cursos.cursoSeleccionado.nombre +
        ' - ' +
        store.state.cursos.cursoSeleccionado.seccion
    })
  },

  data: () => ({
    headerProyectosJugador: [
      { text: 'Proyectos', value: 'nombre', sortable: false, width: 400 },
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
        align: 'center'
      },
      {
        text: 'Tiempo de Juego (hh:mm)',
        value: 'tiempoJuego',
        sortable: false,
        align: 'center'
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
      if (x >= 80) return '#2BBE21'
      else if (x >= 50 && x < 80) return '#ffdf00'
      else if (x < 50) return '#D62D2D'
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
.curso-table.table-summary .v-data-table__wrapper {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
