export const state = () => ({
  isAuthenticated: false,
  user: null
})

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user
    state.user = user
  }
}
const TOKEN_AUTH_USERNAME = 'Clave Personalizada'
const TOKEN_AUTH_PASSWORD = 'Clave Personalizada'
const Cookie = process.client ? require('js-cookie') : undefined

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

  loginP({ commit }, { username, password }) {
    this.$axios
      .post(
        'Usuarios/login/',
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
        console.log('x.dtaa', x)
        const auth = {
          accessToken: x.data.token
        }
        commit('setAuth', auth, { root: true }) // mutating to store for client rendering
        this.$router.push('/')
        Cookie.set('auth', auth) // saving token in cookie for server rendering
        commit(
          'SHOW_SNACKBAR',
          { color: 'success', message: 'Bienvenido' },
          { root: true }
        )
      })
      .catch((e) => {
        // Se tiene que mejorar el mensaje de retorno
        console.log(e)
        commit(
          'SHOW_SNACKBAR',
          { color: 'error', message: 'Usuario o Contraseña Incorrecta' },
          { root: true }
        )
      })
  }
}
