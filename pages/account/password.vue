<template>
  <v-row fill-height align="center" justify="center">
    <div class="card_validated_master">
      <v-container fluid class="card_validated">
        <v-row class="justify-center fill-height">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold primary--text text-center mb-4">
              Cambiar Contraseña
            </h2>
            <span>
              ¡Bienvenido a Kimen! La institución
              <strong>{{ datosValidacion.nombreInstitucion }}</strong> tiene una
              cuenta de usuario Kimen habilitada para tu uso personal. Debes
              crear una contraseña personal e intransferible, que te permitirá
              jugar y aprender con Kimen PM.
            </span>
            <br />
            <br />
            <span>
              Actualmente estás registrado en los siguientes cursos:
              <strong>
                <v-chip
                  v-for="(curso, i) in datosValidacion.listaCursos"
                  :key="i"
                  x-small
                  label
                  class="mr-2"
                >
                  {{ curso }}
                </v-chip>
              </strong>
            </span>
          </v-col>
          <v-col cols="12" sm="9">
            <div class="d-flex flex-column flex-sm-row justify-space-between">
              <label style="width: 40%;" for="password"
                >Ingresa tu Contraseña:
              </label>
              <div style="width: 50%;">
                <v-text-field
                  v-model="password"
                  id="password"
                  type="password"
                  outlined
                  placeholder="password"
                ></v-text-field>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row justify-space-between">
              <label style="width: 40%;" for="password-new">
                Ingresa tu Contraseña Nuevamente:
              </label>
              <div style="width: 50%;">
                <v-text-field
                  v-model="newPassword"
                  id="password-new"
                  type="password"
                  outlined
                  placeholder="xxxxxxx"
                ></v-text-field>
              </div>
            </div>
            <div class="text-right">
              <v-btn
                color="primary"
                depressed
                large
                class="px-11"
                @click="changePassword()"
              >
                Aceptar
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="3">
            <span class="text-caption">
              La contraseña debe contener como mínimo: 8 caracteres, 1 letra, 1
              número y un carácter especial (tal como . - ,)
            </span>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  layout: 'validate',

  data: () => ({
    emailvalid: true,
    password: '',
    newPassword: ''
  }),
  computed: {
    ...mapState({ datosValidacion: (state) => state.auth2.datosValidacion })
  },
  methods: {
    changePassword() {
      this.$axios
        .post('usuarios/crearPassword', {
          Id: this.datosValidacion.id,
          Password: this.password
        })
        .then((x) => {
          console.log('====================================')
          console.log(x.data)
          console.log('====================================')
        })
        .catch((e) => {
          this.emailvalid = false
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
