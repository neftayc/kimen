<template>
  <div class="d-flex align-center justify-center">
    <div>
      <v-card
        flat
        width="60px"
        fill-height
        style="line-height: 1;"
        class="transparent py-3 text-center"
      >
        <v-badge left inline :color="getColor(proyecto.kpiTotal)" dot>
          <small v-if="!proyecto.finalizado ? proyecto.kpiTotal !== 0 : true">
            {{ proyecto.kpiTotal }}%
          </small>
        </v-badge>
        <br />
        <small>{{
          !proyecto.finalizado
            ? proyecto.kpiTotal === 0
              ? 'En espera'
              : 'En proceso'
            : 'Finalizado'
        }}</small>
      </v-card>
    </div>
    <div v-if="false" class="text-left">
      <div class="text-caption black--text" style="line-height: 1.2;">
        {{ proyecto.nombre }}
      </div>
      <div
        class="text-caption"
        :class="proyecto.finalizado ? '' : 'primary--text'"
      >
        <small>{{
          proyecto.kpiTotal !== 0
            ? proyecto.finalizado
              ? 'Finalizado'
              : 'En proceso'
            : 'En espera'
        }}</small>
      </div>
    </div>
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
      if (x >= 80) return '#2BBE21'
      else if (x >= 50 && x < 80) return '#ffdf00'
      else if (x < 50 && this.proyecto.finalizado) return '#D62D2D'
      else return 'grey'
    }
  }
}
</script>

<style lang="scss" scoped></style>
