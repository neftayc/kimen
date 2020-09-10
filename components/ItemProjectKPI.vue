<template>
  <v-badge
    v-if="estado ? true : kpiTotal"
    left
    inline
    :color="getColor(kpi)"
    dot
  >
    <small> {{ kpi }}% </small>
  </v-badge>
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
