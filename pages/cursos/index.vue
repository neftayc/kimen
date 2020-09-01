<template>
  <v-container fluid>
    <v-card flat>
      <v-toolbar flat class="header-page">
        <v-toolbar-title>
          <div class="subtitle-2">Lista de Cursos - Seccion</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-text-field
            hide-details
            dense
            outlined
            label="Buscar curso"
          ></v-text-field>
        </div>
      </v-toolbar>

      <v-card tile elevation="6">
        <v-data-table
          class="curso-table"
          :headers="headerCursos"
          :items="cursosData"
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
                  @click="goToDashboard(item)"
                  v-on="on"
                >
                  <v-icon small>mdi-monitor-dashboard</v-icon>
                </v-btn>
              </template>
              <span>Dashboard</span>
            </v-tooltip>
            <template v-if="false">
              <v-tooltip top color="grey darken-2">
                <template v-slot:activator="{ on }">
                  <v-btn
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
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('cursos/listCursos')
    await store.commit('CHANGE_PAGE_TITLE', 'Cursos')
  },
  data: () => ({
    headerCursos: [
      {
        text: 'Id',
        value: 'cursoId',
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
    ]
  }),
  computed: {
    ...mapState({
      cursosData: (state) => state.cursos.cursosData
    })
  },
  methods: {
    goToDashboard(item) {
      this.$router.push(`cursos/${item.seccionCursoId}/dashboard`)
    },
    goToConfigurar(item) {
      this.$router.push(`cursos/${item.seccionCursoId}/configuracion`)
    }
  }
}
</script>

<style lang="scss">
.header-page {
  .v-toolbar__content {
    padding: 0;
  }
}
</style>
