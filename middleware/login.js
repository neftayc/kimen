export default function ({ store, redirect }) {
  if (store.state.authToken.accessToken) {
    console.log('autenticado', store.state.authToken)
    return redirect('/index')
  }
}
