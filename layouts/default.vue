<template>
  <v-app dark>
    <v-app-bar
      absolute
      app
      dark
      flat
      :elevation="8"
      height="75"
      class="main-header"
      color="secondary"
      extension-height="100"
    >
      <div class="d-flex align-center">
        <v-img
          style="width: 30px;"
          contain
          :src="require('@/static/image/iconKimen.png')"
        ></v-img>
        <span
          class="font-weight-bold ml-2 text-h5"
          style="letter-spacing: 12px !important;"
          >KIMEN</span
        >
      </div>
      <v-spacer />
      <div v-if="$vuetify.breakpoint.lgAndUp" class="d-flex">
        <div v-for="(item, index) in menuUser" :key="index" class="inline mx-5">
          <template v-if="item.menu_items">
            <v-menu :key="'index_child_' + index" open-on-hover bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text dark v-on="on">
                  <span
                    class="text-capitalize font-weight-medium text-body-2 text-lg-body-1"
                  >
                    {{ item.title }}
                  </span>
                </v-btn>
              </template>
              <v-list dense tile>
                <v-list-item
                  v-for="(subItem, ii) in item.menu_items"
                  :key="ii"
                  :to="subItem.to"
                >
                  <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-else>
            <v-btn
              :key="index"
              text
              dark
              :to="item.to"
              rippled="false"
              active-class="primary darken-1"
            >
              <span class="text-capitalize easy-body-2 font-weight-medium">
                {{ item.title }}
              </span>
            </v-btn>
          </template>
        </div>
      </div>
      <v-spacer />
      <div>
        <v-btn
          depressed
          color="primary "
          dark
          large
          class="rounded-xl"
          @click="logout()"
        >
          <v-icon class="mr-1">mdi-bullseye-arrow</v-icon>
          <span class="text-capitalize font-weight-bold text-subtitle-2">
            Right Choice
          </span>
          <v-icon right small>mdi-logout</v-icon>
        </v-btn>
      </div>
      <template v-slot:extension>
        <div class="header-extension-item">
          <v-list-item class="px-0">
            <v-list-item-avatar
              class="align-self-center"
              color="grey"
              :size="60"
            >
              <v-img :src="require('@/static/avatar.jpg')" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                style="white-space: normal;"
                class="font-weight-bold"
              >
                <template v-if="userInfo">
                  {{ userInfo.nombre }}
                  {{ userInfo.apellido }}
                </template>
                <template v-else>
                  User info
                </template>
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="userInfo"
                class="text-capitalize text-caption"
                v-html="userInfo.rol"
              >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div class="text-center">
          <h1 class="font-weight-bold text-center">
            {{ titlePage.title }}
          </h1>
          <p class="text-h6 font-weight-regular">
            {{ titlePage.subtitle }}
          </p>
        </div>
        <div class="header-extension-item"></div>
      </template>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-snackbar
      v-model="input_snackbar"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :top="snackbar.y === 'top'"
      >{{ snackbar.message }}</v-snackbar
    >
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth'],
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      menuItems: [
        {
          id: 1,
          icon: 'mdi-account-group-outline',
          title: 'Inicio',
          to: '/'
        },
        {
          id: 2,
          icon: 'mdi-account-group-outline',
          title: 'Perfil',
          to: '/account/profile#'
        },
        {
          id: 3,
          icon: 'mdi-cogs',
          title: 'Configuracion',
          to: '/configuracion',
          menu_items: [
            {
              id: 11,
              icon: 'mdi-account-group-outline',
              title: 'Usuarios',
              to: '/configuracion/usuarios'
            },
            {
              id: 10,
              icon: 'mdi-account-group-outline',
              title: 'Instituciones',
              to: '/configuracion/institucion'
            },
            {
              id: 11,
              icon: 'mdi-account-group-outline',
              title: 'Cursos',
              to: '/configuracion/cursos'
            }
          ]
        },
        {
          id: 4,
          icon: 'mdi-text-box-multiple',
          title: 'Cursos',
          to: '/cursos'
        },
        {
          id: 5,
          icon: 'mdi-text-box-multiple',
          title: 'Estudiantes',
          to: '/estudiantes'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },

  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      titlePage: (state) => state.titlePage,
      userInfo: (state) => (state.auth ? state.auth.user : {})
    }),
    menuUser() {
      // === Usuarios DEL SISTEMA KIMEN ===
      // AdminKimen=0
      // Profesor=2
      // Estdiante=3
      // AdminInstitucion=1
      // Dev=4
      // BetaTester=5
      switch (this.userInfo.rol) {
        case 'ADMIN_KIMEN':
          return this.menuItems
        case 'ADMIN_INSTITUCION':
          return this.menuItems
        case 'PROFESOR':
          return this.menuItems // .filter((x) => x.id !== 3)
        case 'ESTUDIANTE':
          return this.menuItems
        case 'DEV':
          return this.menuItems
        case 'BETATESTER':
          return this.menuItems
        default:
          return this.menuItems
      }
    },
    input_snackbar: {
      get() {
        return this.$store.state.snackbar.state
      },
      set(value) {
        this.$store.commit('SHOW_SNACKBAR_STATE', value)
      }
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
<style lang="scss">
.main-header {
  .theme--dark.v-btn--active:hover::before,
  .theme--dark.v-btn--active::before {
    opacity: 0.1;
  }
  .v-toolbar__extension {
    justify-content: space-between;
  }
  .header-extension-item {
    max-width: 270px;
    min-width: 270px;
  }
}
</style>
