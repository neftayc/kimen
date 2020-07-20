<template>
  <v-row class="fill-height black" justify="center" align="center">
    <v-card
      class="transparent pa-2"
      elevation="10"
      max-width="400"
      dark
      min-width="300"
    >
      <v-img height="80" contain :src="require('@/static/icon.png')"></v-img>
      <v-card-title class="secodary"> </v-card-title>
      <v-form ref="form" v-model="valid" autocomplete="off">
        <v-text-field
          v-model="form.username"
          prepend-icon="mdi-account"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          prepend-icon="mdi-key"
          :type="show1 ? 'password' : ''"
          label="Password"
          required
          autocomplete="new-password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          @keypress.enter="login"
        ></v-text-field>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="mx-auto"
            color="secondary"
            block
            :loading="loading"
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  middleware: ['login'],
  layout: 'login',
  data: () => ({
    valid: null,
    loading: false,
    show1: true,
    form: {
      username: '',
      password: ''
    }
  }),

  methods: {
    async login() {
      this.loading = true
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push('/kpis')
      } catch (_) {}
      this.loading = false
    }
  }
}
</script>
