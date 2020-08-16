<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="white">
        <v-toolbar-title>Gestionar Usuarios</v-toolbar-title>

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
          <span>Anadir Usuario</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        hide-default-footer
        :headers="headersUsuarios"
        :items="listaUsuarios"
      >
        <template v-slot:item.logo>
          <v-avatar :size="70">
            <v-img :src="require('@/static/logo.png')" />
          </v-avatar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                color="info"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="editarUsuario(item)"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                color="error"
                class="px-2 mx-1"
                :min-width="0"
                v-on="on"
                @click="deleteUsuario(listaUsuarios.indexOf(item), item)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Elimanar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="modalForm" persistent :max-width="'80%'">
        <v-card>
          <v-card-title class="primary darken-2 white--text">
            Gestion de Usuario
          </v-card-title>
          <v-container fluid class="px-8">
            <v-row>
              <v-col cols="12" sm="6">
                <v-card>
                  <div class="accent" style="height: 10px;"></div>
                  <v-card-title>
                    Datos del Usuario
                  </v-card-title>
                  <v-container fluid>
                    <v-row align="center" justify="center">
                      <v-col cols="12" class="py-0">
                        <v-text-field
                          v-model="Usuario.name"
                          label="Nombres"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-text-field
                          v-model="Usuario.apellidos"
                          label="Apellidos"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-text-field
                          v-model="Usuario.email"
                          type="email"
                          label="Email"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-select
                          v-model="Usuario.type"
                          label="Tipo"
                          :items="[
                            'Docente',
                            'Ayudante',
                            'administrador de universidad'
                          ]"
                          outlined
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card>
                  <div class="accent" style="height: 10px;"></div>
                  <v-card-title>
                    Seleccionar Curso - Sección
                  </v-card-title>
                  <v-expansion-panels v-model="panel">
                    <v-expansion-panel
                      v-for="(curso, index) in listaCursos"
                      :key="index + 'curso'"
                    >
                      <v-expansion-panel-header class="font-weight-bold">
                        Curso: {{ curso.name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-list>
                          <span
                            class="primary--text font-weight-medium text-subtitle-2"
                            >Seleccionar Sección</span
                          >
                          <v-list-item-group
                            v-model="selectedCursoSeccion"
                            color="primary"
                          >
                            <v-list-item
                              v-for="(item, i) in listaSecciones"
                              :key="i"
                            >
                              <v-list-item-icon class="mx-2">
                                <v-icon color="accent darken-2"
                                  >mdi-book</v-icon
                                >
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title>{{
                                  item.description
                                }}</v-list-item-title>
                                <v-list-item-subtitle class="grey--text">
                                  Fecha Inicio: {{ item.start_date }} - Fecha
                                  Fin:
                                  {{ item.end_date }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
            </v-row>
            <div class="d-flex justify-center my-6">
              <v-btn
                color="primary darken-1"
                class="mx-1"
                @click="modalForm = false"
              >
                <span class="text-capitalice">Guardar</span>
              </v-btn>
              <v-btn color="secondary" class="mx-1" @click="modalForm = false">
                <span class="text-capitalice">Cancelar</span>
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    Usuario: {},
    loading: false,
    selectedCursoSeccion: '',
    panel: 0,
    headersUsuarios: [
      {
        text: 'Apellidos y Nombres',
        value: 'apellidos',
        sortable: false,
        width: 250
      },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Institución', value: 'institucion', sortable: false },
      { text: 'Tipo', value: 'type', sortable: false },
      { text: 'Secciones', value: 'secciones', sortable: false },
      {
        text: 'Accions',
        value: 'actions',
        sortable: false,
        align: 'center',
        width: 150
      }
    ],
    modalForm: false
  }),
  computed: {
    ...mapState({
      listaUsuarios: (state) =>
        JSON.parse(JSON.stringify(state.configuracion.listaUsuarios)),
      listaSecciones: (state) => state.configuracion.listaSecciones,
      listaCursos: (state) => state.configuracion.listaCursos
    })
  },
  methods: {
    editarUsuario(item) {
      this.modalForm = true
      this.Usuario = item
    },
    deleteUsuario(index, item) {
      this.listaUsuarios.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
