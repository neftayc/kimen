<template>
  <v-row fill-height align="center" justify="center">
    <div class="card_validated_master">
      <v-container fluid class="card_validated">
        <v-row class="justify-center fill-height align-end">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold primary--text mb-4">
              Cuenta Activa
            </h2>
            <span>
              ¡Te damos la más cordial bienvenida! Tu cuenta ya está activada en
              la institución NOMBRE_INSTITUCIÓN.
              <br />
              Ahora podrás ingresar a tu cuenta para descargar Kimen PM y
              acceder a documentos relevantes que tenemos para ti.
            </span>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-btn color="primary" large depressed @click="goLogin()">
                Login
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-row>
</template>
<script>
export default {
  layout: 'validate',
  data: () => ({
    emailvalid: true
  }),
  methods: {
    goLogin() {
      this.$router.push('/login')
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
