<template>
  <v-row fill-height align="center" justify="center">
    <div class="card_validated_master">
      <v-container fluid class="card_validated">
        <v-row class="fill-height">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold primary--text mb-4">
              Mi Perfil
            </h2>
          </v-col>
          <v-col cols="12" sm="5" md="4">
            <v-btn
              color="primary"
              class="mb-6 justify-start"
              x-large
              block
              depressed
              to="/account/profile"
            >
              <span class="text-subtitle-2 font-weight-medium text-capitalize"
                >Información</span
              >
            </v-btn>
            <v-btn
              color="primary"
              class="mb-6 justify-start"
              block
              x-large
              depressed
              to="#download-app"
            >
              <span class="text-subtitle-2 font-weight-medium text-capitalize"
                >Descarga APP</span
              >
            </v-btn>
            <v-btn
              color="primary"
              class="mb-6 justify-start"
              block
              x-large
              depressed
              to="#download-doc"
            >
              <span class="text-subtitle-2 font-weight-medium text-capitalize"
                >Descarga Documentación</span
              >
            </v-btn>
            <v-btn
              color="primary"
              class="mb-6 justify-start"
              block
              x-large
              depressed
              to="#change-password"
            >
              <span class="text-subtitle-2 font-weight-medium text-capitalize"
                >Cambio de Contraseña</span
              >
            </v-btn>
            <v-btn
              color="primary"
              class="mb-6 justify-start"
              block
              x-large
              depressed
              to="#support"
            >
              <span class="text-subtitle-2 font-weight-medium text-capitalize"
                >Soporte Kimen</span
              >
            </v-btn>
          </v-col>
          <v-col v-if="$route.hash === ''" cols="12" sm="7" md="8">
            <v-card flat class="pa-7">
              <v-row>
                <v-col cols="6" sm="6" md="6" class="table-card">
                  Institución:
                </v-col>
                <v-col cols="6" sm="6" md="6" class="table-card">{{
                  userInfo.nombreInstitucion
                }}</v-col>
                <v-col cols="6" sm="6" md="6" class="table-card">Nombre:</v-col>
                <v-col cols="6" sm="6" md="6" class="table-card"
                  >{{ userInfo.nombre }} {{ userInfo.apellido }}</v-col
                >
                <v-col cols="6" sm="6" md="6" class="table-card">Email:</v-col>
                <v-col cols="6" sm="6" md="6" class="table-card">{{
                  userInfo.email
                }}</v-col>
              </v-row>
            </v-card>
            <v-card flat class="pa-7">
              <h3 class="text-subtitle-1 font-weight-bold primary--text">
                Cursos Inscritos en KIMEN
              </h3>
              <v-data-table
                :headers="[
                  { text: 'Código', value: 'codigo', sortable: false },
                  { text: 'Nombre', value: 'nombre', sortable: false },
                  {
                    text: 'Fecha Inicio',
                    value: 'fecha_inicio',
                    sortable: false
                  },
                  { text: 'Fecha Fin', value: 'fecha_fin', sortable: false }
                ]"
                :items="listaCursos"
                hide-default-footer
              ></v-data-table>
            </v-card>
          </v-col>
          <v-col v-if="$route.hash === '#download-app'" cols="12" sm="7" md="8">
            <v-card flat>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="6" v-if="false">
                    <div
                      id="w-node-49a0d7f4942d-1a5ae2ef"
                      class="w-embed-youtubevideo youtube"
                    >
                      <iframe
                        src="https://www.youtube.com/embed/snUvmqvpSxg?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <h3 class="text-h5 font-weight-bold">KIMEN JUEGOS</h3>
                    <p class="text-caption py-6">
                      Kimen PM permite simular la gestión de un proyecto desde
                      inicio a fin, apoyando de manera natural a las asignaturas
                      de evaluación de proyectos, gestión de proyectos,
                      emprendimiento, proyectos de especialidad, entre otros.
                      Kimen PM está pensado para ser utilizado tanto en clases
                      como en el trabajo individual de cada estudiante donde
                      quiera que esté.
                    </p>
                    <div
                      class="d-flex flex-column flex-lg-row justify-space-around"
                    >
                      <div class="text-center">
                        <v-btn
                          color="accent lighten-1"
                          class="mt-4 mt-lg-0"
                          large
                          depressed
                        >
                          <span class="text-subtitle-2">
                            W
                            <span class="text-lowercase">indows 32 bits</span>
                          </span>
                          <v-icon>mdi-microsoft-windows-classic</v-icon>
                        </v-btn>
                      </div>
                      <div class="text-center">
                        <v-btn
                          color="accent lighten-1"
                          class="mt-4 mt-lg-0"
                          large
                          depressed
                        >
                          <span class="text-subtitle-2">
                            W
                            <span class="text-lowercase">indows 64 bits</span>
                          </span>
                          <v-icon>mdi-microsoft-windows</v-icon>
                        </v-btn>
                      </div>
                      <div class="text-center">
                        <v-btn
                          color="accent lighten-1"
                          class="mt-4 mt-lg-0"
                          large
                          depressed
                        >
                          <span class="text-subtitle-2 text-capitalize"
                            >Mac OS Catalina</span
                          >
                          <v-icon>mdi-apple</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col v-if="$route.hash === '#download-doc'" cols="12" sm="7" md="8">
            <v-card flat class="pa-7">
              <h3>Descargar Documentación</h3>
            </v-card>
          </v-col>
          <v-col
            v-if="$route.hash === '#change-password'"
            cols="12"
            sm="7"
            md="8"
          >
            <v-card flat class="pa-7">
              <h3>Cambiar Contraseña</h3>
            </v-card>
          </v-col>
          <v-col v-if="$route.hash === '#support'" cols="12" sm="7" md="8">
            <v-card flat class="pa-7">
              <h3>Contactenos</h3>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-row>
</template>
<script>
export default {
  layout: 'validate',
  middleware: ['auth'],
  data: () => ({
    listaCursos: [
      {
        codigo: 'PM-001',
        nombre: 'Introducción de Project Management',
        fecha_inicio: '01-07-2020',
        fecha_fin: '01-09-2020'
      },
      {
        codigo: 'PM-002',
        nombre: 'Introducción de Project Management',
        fecha_inicio: '01-07-2020',
        fecha_fin: '01-09-2020'
      },
      {
        codigo: 'PM-003',
        nombre: 'Introducción de Project Management',
        fecha_inicio: '01-07-2020',
        fecha_fin: '01-09-2020'
      }
    ]
  }),
  computed: {
    userInfo() {
      return this.$store.state.auth ? this.$store.state.auth.user : {}
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-card {
  border-collapse: collapse;
  border: 1px solid rgb(24, 23, 23);
}
.card_validated_master {
  margin: 0 100px;
}
.card_validated {
  padding: 35px 50px;
  background: rgba(253, 253, 253, 0.9);
  border-radius: 13px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.08),
    0 15px 40px rgba(45, 47, 54, 0.185);

  &-form {
    padding: 0 60px;
  }
}

@media screen and (max-width: 500px) {
  .card_validated {
    padding: 35px 10px;
  }
  .card_validated_master {
    max-width: 95%;
    margin: 15px auto;
  }
}

@media (min-width: 500px) and (max-width: 700px) {
  .card_validated_master {
    max-width: 90%;
    margin: 15px auto;
  }
}

@media (min-width: 700px) and (max-width: 1200px) {
  .card_validated_master {
    max-width: 90%;
  }
}

@media (min-width: 1200px) {
  .card_validated_master {
    max-width: 80%;
  }
}
</style>
