<template>
  <div></div>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Estudiantes',
      subtitle: ''
    })
  }
}
</script>

<style lang="scss" scoped></style>
