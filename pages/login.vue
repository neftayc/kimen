<template>
  <v-card
    elevation="10"
    max-width="75vw"
    min-width="75vw"
    :height="$vuetify.breakpoint.xsOnly ? 'auto' : '71vh'"
  >
    <v-img
      :src="require('@/static/image/fondo-kimen.jpeg')"
      gradient="to bottom, rgba(28,38,55,.56), rgba(28,38,55,.56)"
      height="100%"
      class="page-login-fondo"
      position="left center"
    >
      <v-row no-gutters class="login-content">
        <v-col cols="12" sm="6" class="d-flex align-center py-6">
          <v-img
            height="80"
            contain
            :src="require('@/static/logoKimen.png')"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="6" class="rounded-r white">
          <v-card
            class="fill-height d-flex align-center justify-center mx-auto px-4 px-sm-8 pb-4 pb-sm-11"
            :max-width="360"
            flat
            tile
          >
            <div>
              <h2 class="text-title text-center mb-2 mt-4 mt-sm-0 mb-sm-11">
                Inicio de Sesión
              </h2>
              <v-form
                ref="form"
                v-model="valid"
                autocomplete="off"
                style="width: 100%;"
              >
                <v-text-field
                  v-model="form.email"
                  prepend-inner-icon="mdi-email-mark-as-unread"
                  label="Correo electrónico"
                  autocomplete="off"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  prepend-inner-icon="mdi-lock-outline"
                  :type="show1 ? 'password' : ''"
                  label="Contraseña"
                  autocomplete="off"
                  required
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  @keypress.enter="userLogin"
                ></v-text-field>
                <v-checkbox label="Recuérdame" small dense></v-checkbox>
                <v-card-actions class="d-flex justify-center mx-sm-11 mb-11">
                  <v-btn
                    class="mx-auto rounded-xl"
                    color="primary"
                    x-sm-large
                    block
                    :loading="loading"
                    @click="userLogin"
                  >
                    <span class="text-capitalize font-weight-bold"
                      >Ingresar</span
                    >
                  </v-btn>
                </v-card-actions>
                <div class="text-center">
                  <p class="text-caption text-md-body-2">
                    ¿Olvidaste tu contraseña?
                    <nuxt-link
                      to=""
                      class="primary--text"
                      style="cursor: pointer;"
                      >Click Aquí</nuxt-link
                    >
                  </p>
                  <p class="text-caption text-md-body-2">
                    ¿No estas registrado?
                    <nuxt-link to="" class="primary--text"
                      >Registrate ahora</nuxt-link
                    >
                  </p>
                </div>
              </v-form>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  layout: 'login',
  middleware: 'guest',
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
<style lang="scss">
.login-content {
  height: 100%;
}
</style>
