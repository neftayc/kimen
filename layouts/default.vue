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
      <v-list dense>
        <v-list-item two-line :class="miniVariant ? 'my-6 px-2' : 'my-6 px-8'">
          <v-list-item-avatar>
            <v-img :src="require('@/static/avatar.jpg')" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Juan Pérez</v-list-item-title
            >
            <v-list-item-subtitle>Cerrar sesión</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-11"></v-divider>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
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
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Universidad UPM</v-list-item-title>
            <v-list-item-subtitle>Configuración</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile class="ma-0">
            <v-img :src="require('@/static/v.png')" />
          </v-list-item-avatar>
        </v-list-item>
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
  middleware: ['auth'],
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      menuItems: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-text-box-multiple',
          title: 'Cursos',
          to: '/cursos'
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Estudiantes',
          to: '/estudiantes'
        },
        {
          icon: 'mdi-cogs',
          title: 'Configuracion',
          to: '/configuracion'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dashboard'
    }
  },

  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar
    }),
    input_snackbar: {
      get() {
        return this.$store.state.snackbar.state
      },
      set(value) {
        this.$store.commit('SHOW_SNACKBAR_STATE', value)
      }
    }
  }
}
</script>
