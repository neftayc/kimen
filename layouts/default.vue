<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      dark
      :mini-variant="miniVariant"
      color="primary darken-2"
    >
      <v-list-item class="mt-11">
        <v-list-item-avatar class="align-self-center" color="grey">
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
          <v-list-item-subtitle class="text-capitalize text-caption">
            {{ userInfo.rol }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list>
        <v-divider class="mb-6"></v-divider>
        <template v-for="(item, i) in menuUser">
          <v-list-item
            v-if="!item.menu_items"
            :key="'menu-' + i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :key="'menus-' + i"
            active-class="white--text text--white"
            append-icon="mdi-menu-down"
          >
            <template slot="activator">
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="subItem in item.menu_items"
              :key="subItem.title"
              class="pl-5"
              active-class=" white--text"
              link
              :to="subItem.to"
            >
              <v-list-item-content>
                <v-list-item-title class="text-caption">
                  {{ subItem.title }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon x-small>mdi-forwardburger</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>

      <template v-slot:append>
        <div class="pa-3">
          <v-divider></v-divider>
          <div class="pt-2 d-flex justify-space-between align-center">
            <img
              contain
              height="30px"
              :src="require('@/static/logoKimen.png')"
            />
            <span class="caption white--text">v1.2</span>
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar absolute app color="transparent" flat height="75">
      <v-app-bar-nav-icon
        @click.stop="miniVariant = !miniVariant"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-text="titlePage" />
      <v-spacer />
      <div class="d-flex">
        <v-list-item>
          <v-list-item-avatar tile class="ma-0" :size="50">
            <v-img
              width="100%"
              :src="
                userInfo.logoInstitucion
                  ? userInfo.logoInstitucion
                  : require('@/static/v.png')
              "
              contain
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ userInfo.nombreInstitucion }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              id="logout_web"
              icon
              color="grey darken-1"
              to="/login"
              v-on="on"
              @click="logout"
            >
              <v-icon> mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Salir</span>
        </v-tooltip>
      </div>
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
  middleware: ['auth', 'route'],
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      menuItems: [
        {
          id: 1,
          icon: 'mdi-account-group-outline',
          title: 'Mi Perfil',
          to: '/account/profile'
        },
        {
          id: 2,
          icon: 'mdi-text-box-multiple',
          title: 'Cursos',
          to: '/cursos'
        },
        {
          id: 3,
          icon: 'mdi-cogs',
          title: 'Configuracion',
          to: '',
          menu_items: [
            {
              icon: 'mdi-account-group-outline',
              title: 'Instituciones',
              to: '/configuracion/institucion'
            },
            {
              icon: 'mdi-account-group-outline',
              title: 'Cursos',
              to: '/configuracion/cursos'
            }
          ]
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
          return this.menuItems.filter((x) => x.id !== 3)
        case 'ESTUDIANTE':
          return []
        case 'DEV':
          return []
        case 'BETATESTER':
          return []
        default:
          return []
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
    logout() {
      this.$store.commit('LOGOUT_USER')
    }
  }
}
</script>
<style lang="scss"></style>
