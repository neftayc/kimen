<template>
  <v-container fluid>
    <v-row justify="center">
      <h3>Bienvenidos a KIMEN</h3>
      <chart />
    </v-row>
  </v-container>
</template>

<script>
import chart from '@/components/chart.vue'

export default {
  components: { chart }
}
</script>
