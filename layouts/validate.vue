<template>
  <v-app class="page_validate">
    <v-app-bar absolute app color="transparent" flat height="75" dark>
      <v-container class="px-o text-right d-flex align-center">
        <v-toolbar-title class="font-weight-bold" v-text="'KIMEN'" />
        <v-spacer />
        <div>
          <v-list-item>
            <v-list-item-avatar tile class="ma-0">
              <v-img :src="datosValidacion.nombreInstitucion" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                datosValidacion.nombreInstitucion
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-container>
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
  // middleware: ['auth']

  middleware: ['email-validado'],
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      datosValidacion: (state) => state.auth2.datosValidacion
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
<style lang="scss">
.page_validate {
  background: radial-gradient(
      rgba(223, 203, 98, 0.5),
      rgba(153, 46, 69, 0.4),
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.9)
    ),
    url('../static/fondoP.jpg') !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center center !important;
  background-attachment: fixed !important;
}
</style>
