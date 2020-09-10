export const state = () => ({
  isAuthenticated: false,
  user: null,
  emailValidado: '',
  datosValidacion: {}
})

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user
    state.user = user
  },
  SET_EMAIL_VALID(state, payload) {
    state.emailValidado = payload
  },
  SET_DATOS_VALIDACION(state, payload) {
    state.datosValidacion = payload
  }
}
const TOKEN_AUTH_USERNAME = 'Clave Personalizada'
const TOKEN_AUTH_PASSWORD = 'Clave Personalizada'

export const actions = {
  login({ commit }, { username, password }) {
    this.$axios
      .post(
        'usuarios/login/',
        { email: username, password },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            Authorization:
              'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
          }
        }
      )
      .then((x) => {
        console.log(x)
        commit('set', x)
        this.$router.push('/')
      })
      .catch(() => {})
  },
  validarEmail({ commit }, payload) {
    this.$axios
      .get('usuarios/validaremail/', { params: payload })
      .then((x) => {
        commit('SET_EMAIL_VALID', x)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
