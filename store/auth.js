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
export const actions = {
  load({ commit }) {
    try {
      const user = {}
      commit('set', user)
      return user
    } catch (error) {
      commit('set', null)
    }
  },

  login({ commit }, { username, password }) {
    this.$axios
      .post(
        'Usuarios/login/',
        { username, password },
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
        commit('set', x)
        this.$router.push('/')
      })
      .catch(() => {})
  }
}
