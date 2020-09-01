<template>
  <v-app>
    <nuxt />
  </v-app>
</template>
<script>
export default {
  middleware: ['login']
}
</script>

<style lang="scss" scoped></style>
