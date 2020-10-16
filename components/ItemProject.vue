<template>
  <div v-if="true" class="py-3">
    <v-progress-linear
      :color="getColor(proyecto.kpiTotal)"
      :value="proyecto.kpiTotal"
      rounded
      :height="10"
    ></v-progress-linear>
    <span>
      {{
        !proyecto.finalizado
          ? proyecto.kpiTotal !== 0
            ? proyecto.kpiTotal + '%'
            : ''
          : proyecto.kpiTotal + '%'
      }}
      {{
        !proyecto.finalizado
          ? proyecto.kpiTotal === 0
            ? 'En espera'
            : 'En proceso'
          : 'Finalizado'
      }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    proyecto: {
      type: Object,
      requerid: true
    }
  },
  methods: {
    getColor(x) {
      if (x >= 85) return '#2BBE21'
      else if (x >= 60 && x < 85) return '#ffdf00'
      else if (x < 60 && this.proyecto.finalizado) return '#D62D2D'
      else return 'grey'
    }
  }
}
</script>

<style lang="scss" scoped></style>
