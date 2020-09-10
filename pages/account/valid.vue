<template>
  <v-row fill-height align="center" justify="center">
    <div class="card_validated_master">
      <v-container fluid class="card_validated">
        <v-row class="justify-center fill-height align-end">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold primary--text text-center mb-4">
              Activar Usuario
            </h2>
            <span v-if="emailvalid">
              En esta página podrás activar la cuenta de usuario que tu
              institución ha habilitado para tu uso educativo.
            </span>
            <span v-else>
              <span class="error--text">
                No hemos encontrado que este email tenga una cuenta vigente
                asociada.
              </span>
              Intenta nuevamente o escribe a
              <a href="">soporte@kimengames.com</a> para solicitar ayuda.
            </span>
          </v-col>
          <v-col cols="12" sm="8">
            <div class="d-flex flex-column flex-sm-row justify-space-between">
              <label for="email">Ingresa tu Email Institucional: </label>
              <div style="width: 300px;">
                <v-text-field
                  id="email"
                  v-model="email"
                  outlined
                  placeholder="nombre@institucion.edu"
                ></v-text-field>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row justify-space-between">
              <label for="">Ingresa tu Email Nuevamente: </label>
              <div style="width: 300px;">
                <v-text-field
                  v-model="emailRepeat"
                  outlined
                  placeholder="nombre@institucion.edu"
                ></v-text-field>
              </div>
            </div>
            <div class="text-right">
              <v-btn color="primary" depressed @click="validarEmail()"
                >Aceptar</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <v-img :src="require('@/static/profile.png')" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-row>
</template>
<script>
export default {
  layout: 'validate',
  async fetch({ store }) {
    await store.dispatch('auth2/validarEmail', {
      email: 'rusbel.ccana@gmail.com'
    })
  },
  data: () => ({
    emailvalid: true,
    email: '',
    emailRepeat: ''
  }),
  methods: {
    validarEmail() {
      this.$axios
        .get('usuarios/validaremail/', { params: { email: this.emailRepeat } })
        .then(async (x) => {
          this.emailvalid = true
          await this.$store.commit('SHOW_SNACKBAR', {
            color: 'success',
            message: x.trace
          })
          await this.$store.commit('auth2/SET_DATOS_VALIDACION', x.data)
          await this.$router.push('/account/password')
        })
        .catch((e) => {
          this.$store.commit('SHOW_SNACKBAR', {
            color: 'error',
            message: e.response ? e.response.data.trace : e
          })
          this.emailvalid = false
          // this.$router.push('/account/password')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.card_validated_master {
  margin: 100px;
}
.card_validated {
  padding: 35px 100px;
  background: rgba(253, 253, 253, 0.9);
  border-radius: 13px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.08),
    0 15px 40px rgba(45, 47, 54, 0.185);

  &-form {
    padding: 0 60px;
  }
}

@media screen and (max-width: 500px) {
  .card_validated {
    padding: 35px 50px;
  }
  .card_validated_master {
    max-width: 95%;
    margin: 15px auto;
  }
}

@media (min-width: 500px) and (max-width: 700px) {
  .card_validated_master {
    max-width: 90%;
    margin: 15px auto;
  }
}

@media (min-width: 700px) and (max-width: 1200px) {
  .card_validated_master {
    max-width: 70%;
  }
}

@media (min-width: 1200px) {
  .card_validated_master {
    max-width: 60%;
  }
}
</style>
