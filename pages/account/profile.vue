<template>
  <v-container class="px-6 px-sm-11">
    <div class="d-flex flex-column flex-sm-row mt-5">
      <div class="pr-sm-11">
        <v-card :elevation="3" class="rounded-lg">
          <v-navigation-drawer
            permanent
            :width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
          >
            <v-list nav>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                active-class="primary--text"
                link
                :to="item.to"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>
      <template v-if="$route.hash === '#'">
        <v-container fluid class="py-0">
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <label for="institucion">
                <v-icon>mdi-domain</v-icon> Institución
              </label>
              <v-text-field
                id="institucion"
                v-model="userInfo.nombreInstitucion"
                outlined
                hide-details
                fill-width
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <label for="nombre">
                <v-icon>mdi-account-circle-outline</v-icon> Nombre
              </label>
              <v-text-field
                id="nombre"
                v-model="userInfo.nombre"
                outlined
                hide-details
                fill-width
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <label for="email">
                <v-icon>mdi-email-outline</v-icon> Email
              </label>
              <v-text-field
                id="email"
                v-model="userInfo.email"
                outlined
                hide-details
                fill-width
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <label for="telefono">
                <v-icon>mdi-phone</v-icon> Telefono
              </label>
              <v-text-field
                id="telefono"
                v-model="userInfo.phone"
                outlined
                hide-details
                fill-width
              ></v-text-field>
            </v-col>
          </v-row>
          <h3 class="text-subtitle-1 font-weight-bold mb-3 mt-5">
            <v-icon color="black">mdi-card-account-details</v-icon>
            Cursos Inscritos en KIMEN
          </h3>
          <v-card>
            <v-data-table
              class="curso-table curso"
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
        </v-container>
      </template>
      <template v-if="$route.hash === '#download-app'">
        <v-row>
          <v-col cols="12">
            <h3 class="text-h5 font-weight-bold mt-6 mt-sm-0">
              KIMEN JUEGOS
            </h3>
          </v-col>
          <v-col cols="12" md="8">
            <p class="text-caption text-md-body-2 mb-10">
              Kimen PM permite simular la gestión de un proyecto desde inicio a
              fin, apoyando de manera natural a las asignaturas de evaluación de
              proyectos, gestión de proyectos, emprendimiento, proyectos de
              especialidad, entre otros. Kimen PM está pensado para ser
              utilizado tanto en clases como en el trabajo individual de cada
              estudiante donde quiera que esté.
            </p>
            <p class="primary--text">Descarge la APP KIMEN</p>
            <div class="d-flex flex-column flex-md-row">
              <div class="text-md-center mr-md-4">
                <v-btn
                  color="accent lighten-1"
                  block
                  class="mt-4 mt-md-0 px-md-3 px-lg-4"
                  large
                  depressed
                >
                  <span
                    class="text-subtitle-2 text-sm-caption text-md-subtitle-2"
                  >
                    W<span class="text-lowercase">indows 32 bits</span>
                  </span>
                  <v-icon>mdi-microsoft-windows-classic</v-icon>
                </v-btn>
              </div>
              <div class="text-md-center mr-md-4">
                <v-btn
                  color="accent lighten-1"
                  block
                  class="mt-4 mt-md-0 px-md-3 px-lg-4"
                  large
                  depressed
                >
                  <span
                    class="text-subtitle-2 text-sm-caption text-md-subtitle-2"
                  >
                    W<span class="text-lowercase">indows 64 bits</span>
                  </span>
                  <v-icon>mdi-microsoft-windows</v-icon>
                </v-btn>
              </div>
              <div class="text-md-center mr-md-4">
                <v-btn
                  color="accent lighten-1"
                  block
                  class="mt-4 mt-md-0 px-md-3 px-lg-4"
                  large
                  depressed
                >
                  <span
                    class="text-subtitle-2 text-sm-caption text-md-subtitle-2 text-capitalize"
                    >Mac OS Catalinas</span
                  >
                  <v-icon>mdi-apple</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-card
              tile
              :elevation="16"
              class="rounded-lg ml-md-3 mt-3 mt-md-0"
            >
              <transition name="fase">
                <div class="video-container elevation-16 rounded-lg">
                  <iframe
                    width="420"
                    height="315"
                    src="https://www.youtube.com/embed/snUvmqvpSxg?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-if="$route.hash === '#download-doc'">
        <v-card flat width="100%">
          <h3 class="text-h5 font-weight-bold text-uppercase mb-4">
            Documentación
          </h3>
          <iframe
            frameborder="0"
            src="http://www.pdf995.com/samples/pdf.pdf"
            style="height: calc(100vh - 75px); width: 100%;"
          ></iframe>
        </v-card>
      </template>
      <template v-if="$route.hash === '#change-password'">
        <v-container fluid>
          <v-form ref="form" v-model="valid" lazy-validation autocomplete="off">
            <v-row>
              <template v-if="!successChange">
                <v-col cols="12" lg="6" xl="5" offset-xl="1">
                  <h3 class="text-h5 font-weight-medium text-uppercase">
                    Cambiar Contraseña
                  </h3>
                  <span class="d-block d-lg-none text-caption d-block">
                    La contraseña debe contener como mínimo: 8 caracteres, 1
                    letra, 1 número, un carácter especial (tal como . - ,)
                  </span>
                  <br />
                  <br />
                  <div>
                    <label for="password" class="font-weight-bold">
                      Contraseña Nueva:</label
                    >
                    <v-text-field
                      id="password"
                      v-model="password"
                      :rules="[r.isRequiered, r.password]"
                      required
                      type="password"
                      outlined
                    ></v-text-field>
                  </div>
                  <div>
                    <label for="password-new" class="font-weight-medium"
                      >Confirmar Contraseña Nueva:</label
                    >
                    <v-text-field
                      id="password-new"
                      v-model="newPassword"
                      required
                      :disabled="!password"
                      :rules="[
                        r.isRequiered,
                        password === newPassword
                          ? true
                          : 'Las contraseñas no concuerdan'
                      ]"
                      type="password"
                      outlined
                      @paste.prevent
                    ></v-text-field>
                  </div>
                  <v-btn
                    color="primary"
                    depressed
                    x-large
                    :disabled="!valid"
                    block
                    @click="changePassword()"
                  >
                    <span class="text-capitalize font-weight-bold"
                      >Cambiar Contraseña</span
                    >
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="5" xl="3" class="d-none d-lg-block">
                  <span class="text-caption mt-16 d-block">
                    La contraseña debe contener como mínimo: <br />
                    8 caracteres, 1 letra, 1 número, un carácter especial (tal
                    como . - ,)
                  </span>
                </v-col>
              </template>
              <v-col v-else cols="12" class="mx-auto d-flex justify-center">
                <v-card flat class="mx-auto text-center pa-4">
                  <v-icon x-large color="success">mdi-check-circle</v-icon>

                  <h4 class="text-h5 font-weight-bold mb-2">
                    ¡Contraseña Actualizada!
                  </h4>
                  <p class="text-subtitle-1 font-weight-regular">
                    ¡Tu contraseña ha sido cambiada exitosamente!
                    <br />
                    Utilice su nueva contraseña para
                    <span
                      class="primary--text"
                      style="cursor: pointer;"
                      @click="goLogin()"
                      >Iniciar sesión</span
                    >
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </template>
      <template v-if="$route.hash === '#support'">
        <v-card flat class="mt-11 mt-md-0">
          <h3 class="text-h5 font-weight-bold text-uppercase mb-4">
            Contactenos
          </h3>
          <div class="d-flex flex-column flex-lg-row justify-center">
            <div class="mt-4 mt-lg-0 mr-lg-4">
              <v-card
                outlined
                height="160"
                :width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
                class="pa-8 text-center"
              >
                <span class="font-weight-bold">CUARTEL GENERAL </span>
                <br />
                <p class="ma-0">
                  Av. Providencia #2083 Of 31, <br />
                  Providencia <br />
                  Santiago de Chile
                </p>
              </v-card>
            </div>
            <div class="mt-4 mt-lg-0 mr-lg-4">
              <v-card
                outlined
                height="160"
                :width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
                class="pa-8 text-center"
              >
                <span class="font-weight-bold">HORARIO DE ATENCIÓN</span>
                <br />
                <p class="ma-0">9AM - 6PM, Lu a Vi</p>
              </v-card>
            </div>
            <div class="mt-4 mt-lg-0 mr-lg-4">
              <v-card
                outlined
                height="160"
                :width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
                class="pa-8 text-center"
              >
                <span class="font-weight-bold"> CONTACTO</span>
                <br />
                <p class="ma-0">contacto@kimengames.com</p>
              </v-card>
            </div>
          </div>
        </v-card>
      </template>
    </div>
  </v-container>
</template>
<script>
export default {
  middleware: ['auth'],
  async fetch({ store }) {
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Mi Perfil',
      subtitle: ''
    })
  },
  data: () => ({
    valid: true,
    r: {
      isEmail: (v) => /.+@.+\..+/.test(v) || 'El email debe ser válido',
      isRequiered: (v) => !!v || 'Password requerido!',
      password: (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#])(?=.{8,})/.test(v) ||
        'Debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter'
    },
    password: '',
    newPassword: '',
    successChange: false,
    items: [
      { title: 'Información', icon: 'mdi-information', to: '#' },
      {
        title: 'Descarga',
        icon: 'mdi-download-box-outline',
        to: '#download-app'
      },
      {
        title: 'Documentación',
        icon: 'mdi-file-document',
        to: '#download-doc'
      },
      {
        title: 'Cambio de Contraseña',
        icon: 'mdi-lock-outline',
        to: '#change-password'
      },
      { title: 'Soporte Kimen', icon: 'mdi-face-agent', to: '#support' }
    ],
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
    async goLogin() {
      await this.$auth.logout()
    },
    changePassword() {
      this.$axios
        .post('usuarios/crearPassword', {
          Id: this.datosValidacion.idUsuario,
          Password: this.password
        })
        .then((x) => {
          this.successChange = true
        })
        .catch((e) => {
          console.log('error', e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
