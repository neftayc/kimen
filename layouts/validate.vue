<template>
  <v-app class="page_validate">
    <v-app-bar absolute app color="transparent" flat height="75" dark>
      <v-container class="px-o text-right d-flex align-center">
        <v-toolbar-title class="font-weight-bold" v-text="'KIMEN'" />
        <v-spacer />
        <div>
          <v-list-item>
            <v-list-item-avatar tile class="ma-0">
              <v-img :src="require('@/static/v.png')" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Universidad UPM</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-snackbar
      v-model="$store.state.snackbar.state"
      top="true,"
      right="true,"
      :color="$store.state.snackbar.type"
      multi-line="true"
    >
      <span v-html="$store.state.snackbar.message"></span>
      <v-btn color="accent" text @click="$store.state.snackbar.state = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  // middleware: ['auth']
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
