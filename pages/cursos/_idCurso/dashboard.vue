<template>
  <v-container fluid class="mt-4">
    <div class="d-flex">
      <div>
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
      </div>
    </div>
    <v-container>
      <v-card :elevation="18" class="rounded">
        <v-data-table
          class="curso-table"
          :headers="headerCurso"
          :items="
            proyectoHeader.filter(
              (x) => x.seccionCursoId === parseInt($route.params.idCurso)
            )
          "
          hide-default-footer
        >
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
            <v-tooltip v-if="false" top color="grey darken-2">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="false"
                  min-width="0"
                  class="px-2 mx-1"
                  small
                  depressed
                  color="primary"
                  @click="goToConfigurar(item)"
                  v-on="on"
                >
                  <v-icon small>mdi-cogs</v-icon>
                </v-btn>
              </template>
              <span>Configurar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
      <br />
      <h3 class="text-subtitle-1 font-weight-bold mb-2">
        <v-icon color="black">mdi-format-list-text</v-icon>
        Lista de Proyectos
      </h3>
      <v-card :elevation="18" class="rounded">
        <v-data-table
          class="curso-table"
          :headers="headerProyectos"
          :items="proyectoList"
          hide-default-footer
          :items-per-page="100000"
        >
          <template v-slot:item.estado="{ item }">
            <v-chip small color="primary" outlined class="font-weight-bold">
              {{ item.finalizado ? 'Finalizado' : 'En proceso' }}
            </v-chip>
          </template>
          <template v-slot:item.kpiCrono="{ item }">
            <v-progress-circular
              v-if="item.finalizado ? true : item.kpiProyecto.kpiPlazoAdquirido"
              class="my-2"
              :rotate="-90"
              :size="60"
              :width="8"
              :value="item.kpiProyecto.kpiPlazoAdquirido"
              :color="getColor(item.kpiProyecto.kpiPlazoAdquirido)"
            >
              {{ item.kpiProyecto.kpiPlazoAdquirido }}%
            </v-progress-circular>
          </template>
          <template v-slot:item.kpiCosto="{ item }">
            <v-progress-circular
              v-if="item.finalizado ? true : item.kpiProyecto.kpiCostoAdquirido"
              class="my-2"
              :rotate="-90"
              :size="60"
              :width="8"
              :value="item.kpiProyecto.kpiCostoAdquirido"
              :color="getColor(item.kpiProyecto.kpiCostoAdquirido)"
            >
              {{ item.kpiProyecto.kpiCostoAdquirido }}%
            </v-progress-circular>
          </template>
          <template v-slot:item.kpiSatisfaccion="{ item }">
            <v-progress-circular
              v-if="
                item.finalizado
                  ? true
                  : item.kpiProyecto.kpiSatisfaccionAdquirido
              "
              class="my-2"
              :rotate="-90"
              :size="60"
              :width="8"
              :value="item.kpiProyecto.kpiSatisfaccionAdquirido"
              :color="getColor(item.kpiProyecto.kpiSatisfaccionAdquirido)"
            >
              {{ item.kpiProyecto.kpiSatisfaccionAdquirido }}%
            </v-progress-circular>
          </template>
          <template v-slot:item.kpiTotal="{ item }">
            <v-progress-circular
              v-if="item.finalizado ? true : item.kpiTotal"
              class="my-2"
              :rotate="-90"
              :size="60"
              :width="8"
              :value="item.kpiTotal"
              :color="getColor(item.kpiTotal)"
            >
              {{ item.kpiTotal }}%
            </v-progress-circular>
          </template>
          <template v-slot:item.tiempoTotalSegundos="{ item }">
            <span>{{ getTime(item.tiempoTotalSegundos) }}</span>
          </template>
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

            <template v-if="false">
              <v-tooltip v-if="false" top color="grey darken-2">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="false"
                    min-width="0"
                    class="px-2 mx-1"
                    small
                    depressed
                    color="primary"
                    @click="goToConfigurar(item)"
                    v-on="on"
                  >
                    <v-icon small>mdi-cogs</v-icon>
                  </v-btn>
                </template>
                <span>Configurar</span>
              </v-tooltip>
            </template>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, params }) {
    await store.dispatch('cursos/listCursos')
    await store.dispatch('cursos/getProyectosCurso', params.idCurso)
    await store.commit('CHANGE_PAGE_TITLE', 'Curso - Dashboard')
  },
  data: () => ({
    headerCurso: [
      {
        text: 'Id',
        value: 'seccionCursoId',
        align: 'center',
        width: 70,
        sortable: false
      },
      { text: 'Curso', value: 'nombre', width: 300 },
      { text: 'Sección', value: 'seccion', sortable: false, width: 200 },
      {
        text: 'N° Estudiantes',
        value: 'contEstudiantes',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Fecha Inicio',
        value: 'fechaInicio',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Fecha Fin',
        value: 'fechaTermino',
        sortable: false,
        align: 'center'
      },
      { text: 'Acciones', value: 'actions', align: 'center', sortable: false }
    ],

    headerProyectos: [
      { text: 'Id', value: 'id', sortable: false, align: 'center' },
      { text: 'Proyectos', value: 'nombre', sortable: false },
      {
        text: 'Estado',
        value: 'estado',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Alumnos que Finalizarón',
        value: 'contEstudiantesFinalizados',
        sortable: false,
        align: 'center',
        width: 120
      },
      {
        text: 'KPI Plazo',
        value: 'kpiCrono',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'KPI Costo',
        value: 'kpiCosto',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'KPI Satisfacción',
        value: 'kpiSatisfaccion',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'KPI Total',
        value: 'kpiTotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Tiempo Juego',
        value: 'tiempoTotalSegundos',
        sortable: false,
        align: 'center'
      }
    ]
  }),
  computed: {
    ...mapState({
      proyectoHeader: (state) => state.cursos.cursosData,
      proyectoList: (state) => state.cursos.proyectosCurso
    })
  },
  methods: {
    goToDesempenho(item) {
      this.$router.push('desempenho-estudiantes')
    },
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
