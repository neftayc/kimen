<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <div>
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

        <v-tooltip top color="grey darken-2">
          <template v-slot:activator="{ on }">
            <v-btn
              :min-width="0"
              class="px-2"
              depressed
              color="accent"
              v-on="on"
              @click="showHeaderProject = !showHeaderProject"
            >
              <v-icon>{{
                showHeaderProject
                  ? 'mdi-table-headers-eye-off'
                  : 'mdi-table-headers-eye'
              }}</v-icon>
            </v-btn>
          </template>
          <span class="text-caption">{{
            showHeaderProject ? 'Ocultar Proyectos' : 'Mostrar Proyectos'
          }}</span>
        </v-tooltip>
      </div>
    </div>
    <v-card v-if="showHeaderProject" outlined tile class="mb-7">
      <v-data-table
        class="curso-table curso-table-proyectos"
        :headers="headerProyectoCurso"
        :items="proyectoList"
        dense
        hide-default-footer
      >
      </v-data-table>
    </v-card>

    <div class="d-flex flex-column align-start flex-md-row align-md-end">
      <div class="text-subtitle-1 font-weight-bold">Lista de Estudiantes</div>
      <v-spacer></v-spacer>
      <div v-if="showProyectos" class="d-block">
        <div
          class="d-flex flex-column flex-sm-row align-sm-center justify-space-between"
        >
          <v-switch
            v-model="showProyectos"
            hide-details
            class="mr-4 mt-0"
            label="Detalles Proyectos"
          ></v-switch>
          <div style="width: 300px;" class="mt-4 mt-sm-0">
            <v-select
              v-model="selectedProject"
              outlined
              dense
              label="Seleccionar Proyecto"
              hide-details
              :items="filterData.proyectos"
              return-object
              item-text="nombre"
            ></v-select>
          </div>
        </div>
        <div
          class="d-flex flex-column flex-sm-row align-sm-center justify-space-between my-3"
        >
          <v-switch
            v-model="showFases"
            hide-details
            class="mr-4 mt-0"
            label="Ver por Fases"
          ></v-switch>
          <div style="width: 300px;" class="mt-4 mt-sm-0">
            <v-select
              v-if="showFases"
              v-model="selectedFase"
              outlined
              dense
              label="Seleccioanar Fase"
              hide-details
              item-text="nombre"
              return-object
              :items="faseProyecto"
            ></v-select>
          </div>
        </div>
      </div>
      <div v-else class="d-flex align-center">
        <v-switch
          v-model="showProyectos"
          hide-details
          label="Detalle Proyectos"
          class="mr-3"
        ></v-switch>
      </div>
    </div>
    <v-data-table
      class="curso-table"
      :headers="showFases ? headerFases : headerEstudiantes"
      :items="listaJugadores"
      hide-default-footer
      dense
    >
      <template v-slot:item.fase="{ item }">
        <!--Aqui se debe mostrar el proyecto del estudiante que esta en proceso-->
        <v-list-item
          v-if="
            item.kpiProyectos.find((x) => selectedProject.id === x.id) &&
            showFases
          "
          class="px-0"
        >
          <v-list-item-content
            v-if="
              item.kpiProyectos.find((x) => selectedProject.id === x.id).fases
                .length
            "
          >
            <v-list-item-title class="text-body-2">
              {{
                item.kpiProyectos
                  .find((x) => selectedProject.id === x.id)
                  .fases.find((d) => d.id === selectedFase.id)
                  ? item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id).nombre
                  : '- - - -'
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:item.kpiPromedioTotal="{ item }">
        <v-badge left inline :color="getColor(item.kpiPromedioTotal)" dot>
          <small>{{ item.kpiPromedioTotal }}%</small>
        </v-badge>
      </template>
      <!--ITEMS DE FASES-->
      <template v-slot:item.fase_kpi_plazo="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 100 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.fase_kpi_costo="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 45 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.fase_kpi_satisfaccion="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 1 }}%</small>
        </v-badge>
      </template>
      <!--FASES-->
      <template v-slot:item.fase_1="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 56 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.fase_2="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 56 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.fase_3="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 56 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.fase_4="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 56 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.fase_5="{ item }">
        <v-badge left inline :color="getColor(item.kpiT1)" dot>
          <small>{{ 56 }}%</small>
        </v-badge>
      </template>
      <template v-slot:item.faseKPITotal="{ item }">
        <div class="text-right">
          <v-badge left inline :color="getColor(item.kpiT1)" dot>
            <small>{{ 56 }}%</small>
          </v-badge>
        </div>
      </template>

      <!--ITEMS DE PROYECTOS-->
      <template v-slot:item.Proy1="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[0] : {}"
        />
      </template>
      <template v-slot:item.Proy2="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[1] : {}"
        />
      </template>
      <template v-slot:item.Proy3="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[2] : {}"
        />
      </template>
      <template v-slot:item.Proy4="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[3] : {}"
        />
      </template>
      <template v-slot:item.Proy5="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[4] : {}"
        />
      </template>
      <template v-slot:item.Proy6="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[5] : {}"
        />
      </template>
      <template v-slot:item.Proy7="{ item }">
        <ItemProject
          :proyecto="item.kpiProyectos.length ? item.kpiProyectos[6] : {}"
        />
      </template>
      <!--other datos-->
      <template v-slot:item.proyecto="{ item }">
        <!--Aqui se debe mostrar el proyecto del estudiante que esta en proceso-->
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-body-2">
              {{
                item.kpiProyectos.length
                  ? item.kpiProyectos.find((x) => x.id === selectedProject.id)
                      .id
                  : ''
              }}
              -
              {{
                item.kpiProyectos.length
                  ? item.kpiProyectos.find((x) => x.id === selectedProject.id)
                      .nombre
                  : ''
              }}
            </v-list-item-title>
            <v-list-item-subtitle
              v-if="item.kpiProyectos.length"
              class="text-caption"
              :class="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
                  ? ''
                  : 'primary--text'
              "
            >
              {{
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
                  ? 'Finalizado'
                  : 'En proceso'
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:item.proyecto_kpi_plazo="{ item }">
        <v-badge
          left
          inline
          :color="
            getColor(
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            )
          "
          dot
        >
          <small>
            {{
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            }}%
          </small>
        </v-badge>
      </template>
      <template v-slot:item.proyecto_kpi_costo="{ item }">
        <v-badge
          left
          inline
          :color="
            getColor(
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            )
          "
          dot
        >
          <small
            >{{
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            }}%</small
          >
        </v-badge>
      </template>
      <template v-slot:item.proyecto_kpi_satisfaccion="{ item }">
        <v-badge
          left
          inline
          :color="
            getColor(
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            )
          "
          dot
        >
          <small
            >{{
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            }}%</small
          >
        </v-badge>
      </template>
      <template v-slot:item.proyectoKPITotal="{ item }">
        <v-badge
          left
          inline
          :color="
            getColor(
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            )
          "
          dot
        >
          <small
            >{{
              item.kpiProyectos.find((x) => x.id === selectedProject.id)
                .kpiTotal
            }}%</small
          >
        </v-badge>
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
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemProject from '@/components/ItemProject'
export default {
  component: { ItemProject },
  async fetch({ store, params }) {
    // await store.dispatch('jugadores/listProyectosCurso', params.idCurso)
    await store.dispatch('cursos/getCurso', params.idCurso)
    await store.dispatch('cursos/selectSeccionCurso', params.idCurso)
    await store.dispatch('cursos/getProyectosCurso', params.idCurso)
    await store.commit('CHANGE_PAGE_TITLE', 'Curso - Desempeño de Estudiantes')
  },
  data: (vm) => ({
    showHeaderProject: true,
    showProyectos: false,
    showFases: false,
    selectedProject: {},
    selectedFase: {},
    headerProyectoCurso: [
      {
        text: 'Código',
        value: 'id',
        sortable: false,
        align: 'center',
        width: 100
      },
      { text: 'Nombre', value: 'nombre', sortable: false },
      {
        text: 'Tipo',
        value: 'tipoProyecto',
        sortable: false
      }
    ],

    headerEstudiantesCurso: [
      {
        text: 'Apellidos y Nombres',
        value: 'nombreApellido',
        sortable: false,
        width: 200
      },
      {
        text: 'Id Estudiante',
        value: 'idEstudiante',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Proyecto',
        value: 'proyecto',
        sortable: false,
        width: 150
      },
      {
        text: 'Fase',
        value: 'fase',
        sortable: false,
        width: 100
      },
      {
        text: 'Fase - Total',
        value: 'faseKPITotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Proyecto - Total',
        value: 'proyectoKPITotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'KPI Total Promedio',
        value: 'kpiPromedioTotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Acciones',
        value: 'actions',
        sortable: false,
        align: 'center',
        width: 100
      }
    ],
    headerFases: [],
    faseProyecto: [{ id: '', nombre: 'Todos' }]
  }),
  computed: {
    ...mapState({
      cursoSeleccionado: (state) => state.cursos.cursoSeleccionado,
      proyectoList: (state) => state.cursos.proyectosCurso,
      headerProyectoCursoItems: (state) =>
        state.jugadores.headerProyectoCursoItems,
      listaJugadores: (state) =>
        JSON.parse(JSON.stringify(state.cursos.seccionCursoSelected))
    }),
    ...mapGetters('cursos', ['filterData']),
    headerEstudiantes() {
      if (this.showProyectos && this.showFases && !this.selectedFase.id) {
        return this.headerEstudiantesFases
      } else if (this.showProyectos && !this.showFases) {
        return this.headerEstudiantesProyectoDetail
      } else if (this.showProyectos && this.showFases && this.selectedFase.id) {
        return this.headerEstudiantesFaseDetail
      } else {
        return this.headerEstudiantesProyectos
      }
    },
    // Vista por proyectos
    headerEstudiantesProyectos() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'proyecto' &&
              x.value !== 'proyectoKPITotal' &&
              x.value !== 'fase' &&
              x.value !== 'faseKPITotal'
          )
        )
      )
      for (let i = 0; i < this.filterData.proyectos.length; i++) {
        const pro = this.filterData.proyectos[i]
        d.splice(2 + i, 0, {
          text: pro.id,
          value: pro.id,
          align: 'center',
          width: 100,
          sortable: false
        })
      }
      return d
    },
    // Proyecto details
    headerEstudiantesProyectoDetail() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'kpiPromedioTotal' &&
              x.value !== 'faseKPITotal' &&
              x.value !== 'fase'
          )
        )
      )
      d.splice(3, 0, {
        text: 'KPI Plazo ',
        value: 'proyecto_kpi_plazo',
        align: 'center',
        width: 100,
        sortable: false
      })
      d.splice(4, 0, {
        text: 'KPI Costo ',
        value: 'proyecto_kpi_costo',
        align: 'center',
        width: 100,
        sortable: false
      })
      d.splice(4, 0, {
        text: 'KPI Satisfacción ',
        value: 'proyecto_kpi_satisfaccion',
        align: 'center',
        width: 100,
        sortable: false
      })
      return d
    },
    // Vista por fases
    headerEstudiantesFases() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'kpiPromedioTotal' &&
              x.value !== 'proyectoKPITotal' &&
              x.value !== 'fase'
          )
        )
      )
      const fases = this.filterData.fases.filter((x) => x.id)
      for (let i = 0; i < fases.length; i++) {
        const item = fases[i]
        d.splice(3 + i, 0, {
          text: item.nombre,
          value: 'fase_' + (i + 1),
          align: 'center',
          sortable: false
        })
      }
      return d
    },
    // Vista por fases
    headerEstudiantesFaseDetail() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'kpiPromedioTotal' && x.value !== 'proyectoKPITotal'
          )
        )
      )
      d.splice(4, 0, {
        text: 'Fase KPI Plazo ',
        value: 'fase_kpi_plazo',
        align: 'center',
        width: 100,
        sortable: false
      })
      d.splice(5, 0, {
        text: 'Fase KPI Costo ',
        value: 'fase_kpi_costo',
        align: 'center',
        width: 100,
        sortable: false
      })
      d.splice(6, 0, {
        text: 'Fase KPI Satisfacción ',
        value: 'fase_kpi_satisfaccion',
        align: 'center',
        width: 100,
        sortable: false
      })
      return d
    }
  },
  watch: {
    showProyectos() {
      this.selectedProject = JSON.parse(
        JSON.stringify(
          this.$store.state.cursos.seccionCursoSelected[0].kpiProyectos[0]
        )
      )
    },
    showFases(v) {
      if (v) {
        if (this.selectedProject.fases.length === 1) {
          console.log('============fasessssssssss', this.selectedProject.fases)
          this.selectedFase = this.selectedProject.fases[0]
        }
        this.faseProyecto = JSON.parse(
          JSON.stringify(this.selectedProject.fases)
        )
        this.faseProyecto.splice(0, 0, { id: '', nombre: 'Todos' })
      }
    },
    selectedProject(item) {
      if (item) {
        if (item.fases.length === 1) {
          this.selectedFase = item.fases[0]
        } else {
          this.selectedFase = { id: '', nombre: 'Todos' }
        }
        this.faseProyecto = JSON.parse(JSON.stringify(item.fases))
        this.faseProyecto.splice(0, 0, { id: '', nombre: 'Todos' })

        const d = JSON.parse(
          JSON.stringify(
            this.headerEstudiantesCurso.filter(
              (x) =>
                x.value !== 'kpiPromedioTotal' &&
                x.value !== 'proyectoKPITotal' &&
                x.value !== 'fase'
            )
          )
        )
        for (let i = 0; i < item.fases.length; i++) {
          const f = item.fases[i]
          d.splice(3 + i, 0, {
            text: f.nombre,
            value: 'fase_' + (i + 1),
            align: 'center',
            sortable: false
          })
        }
        this.headerFases = d
      }
    },
    selectedFase(v) {
      if (v.id) {
        this.headerFases = this.headerEstudiantesFaseDetail
      } else {
        this.faseProyecto = JSON.parse(
          JSON.stringify(this.selectedProject.fases)
        )
        this.faseProyecto.splice(0, 0, { id: '', nombre: 'Todos' })

        const d = JSON.parse(
          JSON.stringify(
            this.headerEstudiantesCurso.filter(
              (x) =>
                x.value !== 'kpiPromedioTotal' &&
                x.value !== 'proyectoKPITotal' &&
                x.value !== 'fase'
            )
          )
        )
        for (let i = 0; i < this.selectedProject.fases.length; i++) {
          const f = this.selectedProject.fases[i]
          d.splice(3 + i, 0, {
            text: f.nombre,
            value: 'fase_' + (i + 1),
            align: 'center',
            sortable: false
          })
        }
        this.headerFases = d
      }
    }
  },
  mouted() {},
  methods: {
    getColor(x) {
      if (x >= 85) return '#2BBE21'
      else if (x >= 60 && x < 85) return '#ffdf00'
      else if (x < 60) return '#D62D2D'
    },
    goToDesempenho(item) {
      this.$router.push(`desempenho-estudiantes/${item.idEstudiante}`)
    }
  }
}
</script>

<style lang="scss">
.curso-table-proyectos.curso-table {
  table thead th {
    height: 40px !important;
    font-size: 0.7rem !important;
  }
  table tbody td {
    font-size: 0.8rem !important;
  }
}
</style>
