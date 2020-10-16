<template>
  <v-app class="page-login">
    <nuxt />
  </v-app>
</template>
<script>
export default {
  middleware: ['guest']
}
</script>

<style lang="scss">
.page-login {
  background-image: url('../static/image/fondo-login.svg') !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center, center !important;
  .v-application--wrap {
    justify-content: center;
    align-items: center;
  }
  & .v-card {
    z-index: 2;
  }
  &-fondo {
    background: transparent;
    .v-image__image.v-image__image--cover {
      background-size: auto;
    }
  }
}
</style>
