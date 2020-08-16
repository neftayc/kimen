export default function ({ store, redirect }) {
  if (!store.state.authToken.accessToken) {
    console.log('no autenticate', store.state.authToken)
    return redirect('/login')
  }
}
