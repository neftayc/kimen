<template>
  <v-container fluid class="mt-11">
    <v-row justify="center">
      <h1>Bienvenidos a KIMEN</h1>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Inicio',
      subtitle: ''
    })
  }
}
</script>
