<template>
  <v-row fill-height align="center" justify="center">
    <div class="card_validated_master">
      <v-container fluid class="card_validated">
        <v-row class="fill-height">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold primary--text mb-4">
              Mi Perfil
            </h2>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn
              color="primary"
              tile
              class="mb-6 justify-start"
              x-large
              block
              depressed
              @click="goLogin()"
            >
              Información
            </v-btn>
            <v-btn
              color="primary"
              tile
              class="mb-6 justify-start"
              block
              x-large
              depressed
              @click="goLogin()"
            >
              Descarga
            </v-btn>
            <v-btn
              color="primary"
              tile
              class="mb-6 justify-start"
              block
              x-large
              depressed
              @click="goLogin()"
            >
              Cambio de Contraseña
            </v-btn>
            <v-btn
              color="primary"
              tile
              class="mb-6 justify-start"
              block
              x-large
              depressed
              @click="goLogin()"
            >
              Soporte Kimen
            </v-btn>
          </v-col>
          <v-col cols="12" sm="8">
            <v-card flat class="pa-7">
              <v-row>
                <v-col cols="6" sm="6" md="6" class="table-card"
                  >Institución:</v-col
                >
                <v-col cols="6" sm="6" md="6" class="table-card"
                  >[Nombre de la Institución]</v-col
                >
                <v-col cols="6" sm="6" md="6" class="table-card">Nombre:</v-col>
                <v-col cols="6" sm="6" md="6" class="table-card"
                  >[Nombre del Usuario]</v-col
                >
                <v-col cols="6" sm="6" md="6" class="table-card">Email:</v-col>
                <v-col cols="6" sm="6" md="6" class="table-card"
                  >[Email del Usuario]</v-col
                >
              </v-row>
            </v-card>
            <v-card flat class="pa-7">
              <h3 class="text-subtitle-1 font-weight-bold primary--text">
                Cursos Inscritos en KIMEN
              </h3>
              <v-data-table
                :headers="[
                  { text: 'Código', value: 'codigo', sortable: false },
                  { text: 'Nombre', value: 'nombre', sortable: false },
                  {
                    text: 'Fecha Inicio',
                    value: 'fecha_inicio',
                    sortable: false
                  },
                  { text: 'Fecha Fin', value: 'fecha_fin', sortable: false }
                ]"
                :items="listaCursos"
                hide-default-footer
              ></v-data-table>
            </v-card>
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
    listaCursos: [
      {
        codigo: 'PM-001',
        nombre: 'Introducción de Project Management',
        fecha_inicio: '01-07-2020',
        fecha_fin: '01-09-2020'
      },
      {
        codigo: 'PM-002',
        nombre: 'Introducción de Project Management',
        fecha_inicio: '01-07-2020',
        fecha_fin: '01-09-2020'
      },
      {
        codigo: 'PM-003',
        nombre: 'Introducción de Project Management',
        fecha_inicio: '01-07-2020',
        fecha_fin: '01-09-2020'
      }
    ]
  }),
  methods: {
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-card {
  border-collapse: collapse;
  border: 1px solid rgb(24, 23, 23);
}
.card_validated_master {
  margin: 0 100px;
}
.card_validated {
  padding: 35px 50px;
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
    padding: 35px 10px;
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
    max-width: 90%;
  }
}

@media (min-width: 1200px) {
  .card_validated_master {
    max-width: 80%;
  }
}
</style>
