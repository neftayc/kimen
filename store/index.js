import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'
export const strict = debug
export const plugins = [createLogger()]
export const state = () => ({
  user: {},
  snackbar: {
    x: 'right',
    y: 'top',
    state: false,
    color: 'success',
    timeout: 5000,
    message: ''
  },
  titlePage: 'Dashboard'
})

export const mutations = {
  SHOW_SNACKBAR(state, payload) {
    state.snackbar.state = true
    state.snackbar.message = payload.message
    state.snackbar.color = payload.color ? payload.color : state.snackbar.color
    state.snackbar.y = payload.y ? payload.y : state.snackbar.y
    state.snackbar.x = payload.x ? payload.x : state.snackbar.x
    state.snackbar.timeout = payload.timeout
      ? payload.timeout
      : state.snackbar.timeout
  },
  SHOW_SNACKBAR_STATE(state, payload) {
    state.snackbar.state = false
  },
  CHANGE_PAGE_TITLE(state, payload) {
    state.titlePage = payload
  }
}
export const actions = {}

export const getters = {
  titlePage: (state) => state.titlePage
}
