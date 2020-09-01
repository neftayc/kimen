<template>
  <v-row class="fill-height page-login" justify="center" align="center">
    <v-card class="pa-6" elevation="10" max-width="400" min-width="300">
      <v-img
        height="80"
        contain
        :src="require('@/static/logoKimen.png')"
      ></v-img>
      <v-card-title class="secodary"></v-card-title>
      <v-form ref="form" v-model="valid" autocomplete="off">
        <v-text-field
          v-model="form.email"
          prepend-icon="mdi-account"
          label="Email"
          autocomplete="off"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          prepend-icon="mdi-key"
          :type="show1 ? 'password' : ''"
          label="Password"
          autocomplete="off"
          required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          @keypress.enter="userLogin"
        ></v-text-field>
        <v-card-actions class="d-flex justify-center px-14">
          <v-btn
            class="mx-auto"
            color="primary"
            large
            depressed
            block
            :loading="loading"
            @click="userLogin"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar
      v-model="input_snackbar"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :top="snackbar.y === 'top'"
      >{{ snackbar.message }}</v-snackbar
    >
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  layout: 'login',
  data: () => ({
    valid: null,
    loading: false,
    show1: true,
    form: {
      email: '',
      password: ''
    }
  }),
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar
    }),
    input_snackbar: {
      get() {
        return this.$store.state.snackbar.state
      },
      set(value) {
        this.SHOW_SNACKBAR_STATE(value)
      }
    }
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR_STATE']),
    async userLogin() {
      // this.$store.dispatch('cursos/listCursosPrueba')
      try {
        await this.$auth.loginWith('local', {
          data: this.form
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-login {
  background-image: url('../static/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: azure;
  &::before {
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: '';
  }
  & .v-card {
    z-index: 2;
  }
}
</style>
