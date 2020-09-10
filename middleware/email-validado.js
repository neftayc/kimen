export default function ({ store, redirect, route }) {
  if (!store.state.auth2.datosValidacion.idUsuario) {
    if (route.path !== '/account/valid') {
      return redirect('/account/valid')
    }
  }
}
