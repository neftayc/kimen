<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      dark
      color="primary darken-2"
    >
      <v-list>
        <v-list-item class="my-6 px-8">
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
    </v-navigation-drawer>

    <v-app-bar absolute app color="transparent" flat height="75">
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

    <v-content>
      <nuxt />
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
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
  }
}
</script>
