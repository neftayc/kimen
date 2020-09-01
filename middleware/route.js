export default function ({ store, redirect, route }) {
  if (store.state.auth.loggedIn) {
    const path = route.path
    if (path === '/') {
      return redirect('/cursos')
    }
  } else {
    return redirect('/login')
  }
}
