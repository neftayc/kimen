import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'
export const strict = debug
export const plugins = [createLogger()]
export const state = () => ({
  snackbar: {
    x: 'right',
    y: 'top',
    state: false,
    color: 'success',
    timeout: 5000,
    message: ''
  }
})
