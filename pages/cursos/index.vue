<template>
  <v-container>
    <v-toolbar flat class="my-5">
      <v-spacer></v-spacer>
      <v-card flat class="transparent search-kimen" min-width="25vw">
        <v-text-field
          large
          hide-details
          label="Buscar curso"
          outlined
          append-icon="mdi-magnify"
          color="primary"
          background-color="white"
          class="rounded-pill elevation-20"
        ></v-text-field>
      </v-card>
      <v-spacer></v-spacer>
    </v-toolbar>
    <h3 class="text-subtitle-1 font-weight-bold mb-2">
      <v-icon color="black">mdi-format-list-text</v-icon>
      Lista de cursos - Sección
    </h3>
    <v-card :elevation="18" class="rounded">
      <v-data-table
        class="curso-table curso"
        :headers="headerCursos"
        :items="cursosData"
        hide-default-footer
        :items-per-page="100000"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip top color="grey darken-2">
            <template v-slot:activator="{ on }">
              <div class="mx-auto text-center" v-on="on">
                <nuxt-link
                  :to="`cursos/${item.seccionCursoId}/dashboard`"
                  class="d-block"
                >
                  <v-img
                    class="mx-auto"
                    :width="34"
                    :src="require('@/static/image/cursos/action-curso.svg')"
                  />
                </nuxt-link>
              </div>
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
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('cursos/listCursos')
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Cursos',
      subtitle: ''
    })
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
    }),
    ...mapGetters('cursos', ['loading'])
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
.search-kimen {
  .v-input {
    &__control {
    }
    &__slot {
      padding: 0 20px !important;
      & fieldset {
        color: transparent !important;
      }
      & label {
        font-size: 1.2rem !important;
        color: rgb(0, 0, 0, 0.55);
        font-weight: normal;
      }
      & label.v-label--active {
        font-size: 1.2rem !important;
        top: 4px !important;
      }
    }
    &__icon--append i {
      font-size: 2rem !important;
      color: var(--v-primary-base) !important;
    }
  }
}
.header-page {
  .v-toolbar__content {
    padding: 0;
  }
}
</style>
