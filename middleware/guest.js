export default function ({ store, redirect }) {
  console.log('========================store============', store.state.auth)
  if (store.state.auth.loggedIn) {
    console.log('se ejecuta esto')
    console.log('====================================')
    return redirect('/')
  }
}
