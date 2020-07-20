<template>
  <v-container fluid>
    <div class="d-flex justify-space-between mb-8">
      <div>
        <h2 class="title">Dashboard Curso</h2>
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
      :headers="headerCurso"
      :items="proyectoHeader"
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
    <br />

    <h2 class="title">Proyectos</h2>
    <v-data-table
      class="curso-table"
      :headers="headerProyectos"
      :items="proyectoList"
      hide-default-footer
    >
      <template v-slot:item.notaPonderada="{ item }">
        <span>{{ item.notaPonderada }}%</span>
      </template>
      <template v-slot:item.estado="{ item }">
        <v-chip small color="primary" outlined class="font-weight-bold">
          {{ item.estado }}
        </v-chip>
      </template>
      <template v-slot:item.kpiCrono="{ item }">
        <v-badge left inline :color="getColor(item.kpiCrono)" dot>
          <span>{{ item.kpiCrono }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.kpiCosto="{ item }">
        <v-badge left inline :color="getColor(item.kpiCosto)" dot>
          <span>{{ item.kpiCosto }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.kpiSatisfaccion="{ item }">
        <v-badge left inline :color="getColor(item.kpiSatisfaccion)" dot>
          <span>{{ item.kpiSatisfaccion }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.kpiTotal="{ item }">
        <v-badge left inline :color="getColor(item.kpiTotal)" dot>
          <span>{{ item.kpiTotal }}%</span>
        </v-badge>
      </template>
      <template v-slot:item.tiempoTotal="{ item }">
        <span>{{ getTime(item.tiempoTotal) }}</span>
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, params }) {
    await store.dispatch('cursos/getCurso', params.idCurso)
  },
  data: () => ({
    headerCurso: [
      { text: 'Universidad', value: 'nombreUniversidad', sortable: false },
      { text: 'Curso', value: 'nombre', sortable: false },
      {
        text: 'Estudiantes',
        value: 'cantEstu',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Periodo Académico',
        value: 'periodo',
        sortable: false,
        align: 'center'
      },
      { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
    ],
    headerProyectos: [
      { text: 'Proyectos', value: 'nombreProyecto', sortable: false },
      /*
      {
        text: 'Ponderación de Nota Final',
        value: 'notaPonderada',
        sortable: false,
        align: 'center',
        width: 150
      }, */
      { text: 'Estado Proyecto', value: 'estado', sortable: false },
      {
        text: 'Alumnos que Finalizarón',
        value: 'alumnosFinalizaron',
        sortable: false,
        align: 'center',
        width: 150
      },
      /*
      {
        text: '# Estudiantes Aprobados',
        value: 'catnAprueban',
        sortable: false,
        align: 'center',
        width: 150
      }, */
      {
        text: 'KPI Plazo',
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
        value: 'kpiSatisfaccion',
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
        text: 'Tiempo Juego',
        value: 'tiempoTotal',
        sortable: false,
        align: 'center'
      }
      /* {
        text: 'Nota Promedio',
        value: 'notaProm',
        sortable: false,
        align: 'center'
      } */
    ]
  }),
  computed: {
    ...mapState({
      proyectoHeader: (state) => [state.cursos.curso[0]],
      proyectoList: (state) => state.cursos.curso
    })
  },
  methods: {
    goToDesempenho(item) {
      this.$router.push('desempenho-estudiantes')
    },
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
