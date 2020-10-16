export default function ({ store, redirect, route, params, query }) {
  if (store.state.auth.loggedIn) {
    if (
      route.path === '/account/valid' ||
      route.path === '/account/password' ||
      route.path === '/account/active'
    ) {
      return redirect('/account/profile')
    }
  } else if (
    !store.state.auth.loggedIn &&
    !store.state.auth2.datosValidacion.idUsuario &&
    !query.id
  ) {
    if (route.path !== '/account/valid') {
      return redirect('/account/valid')
    }
  }
}
