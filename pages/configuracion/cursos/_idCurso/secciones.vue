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
              @click="modalForm = true"
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    headerSeccion: [
      {
        text: 'Código Sección Curso',
        value: 'codigo',
        sortable: false,
        align: 'center',
        width: 150
      },
      { text: 'Descripción', value: 'description', sortable: false },
      { text: 'Fecha Inicio', value: 'start_date', sortable: false },
      { text: 'Fecha Fin', value: 'end_date', sortable: false },
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
      listaSecciones: (state) => state.configuracion.listaSecciones
    })
  },
  methods: {
    cambiarEstado(item) {},
    editarSeccion(item) {},
    deleteSeccion(item) {}
  }
}
</script>

<style lang="scss" scoped></style>
