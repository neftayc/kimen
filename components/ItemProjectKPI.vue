<template>
  <v-progress-circular
    v-if="estado ? true : kpiTotal"
    class="my-2"
    :rotate="-90"
    :size="50"
    :width="7"
    :value="kpi"
    :color="getColor(kpi)"
  >
    {{ kpi }}%
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    kpi: {
      type: Number,
      requerid: true
    },
    kpiTotal: {
      type: Number,
      requerid: true
    },
    estado: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getColor(x) {
      if (x >= 85) return '#2BBE21'
      else if (x >= 60 && x < 85) return '#ffdf00'
      else if (x < 60 && this.estado ? true : this.kpiTotal) return '#D62D2D'
      else return 'grey'
    }
  }
}
</script>

<style lang="scss" scoped></style>
