export const state = () => ({
  headerProyectoCursoItems: [],
  listaJugadores: [],
  listaProyectoJugador: []
})
export const mutations = {
  SET_LIST_PROYECTOS_CURSOS(state, payload) {
    state.headerProyectoCursoItems = [payload]
  },
  SET_LIST_JUGADORES(state, payload) {
    state.listaJugadores = payload.map((x) => {
      let count = 0
      const d = x
      if (x.kpiT1 !== 0) {
        count++
      }
      if (x.kpiT2 !== 0) {
        count++
      }
      if (x.kpiT3 !== 0) {
        count++
      }
      d.kpiT = count ? (x.kpiT1 + x.kpiT2 + x.kpiT3) / count : 0
      return d
    })

    const data = [
      { name: 'Proyecto 1', value: 'd', other: 'x' },
      { name: 'Proyecto 2', value: 'd', other: 'x' },
      { name: 'Proyecto 3', value: 'd', other: 'x' },
      { name: 'Proyecto 4', value: 'd', other: 'x' },
      { name: 'Proyecto 5', value: 'd', other: 'x' },
      { name: 'Proyecto 6', value: 'd', other: 'x' }
    ]
    console.log(data)
    console.log('===============', state.listaJugadores)
    const d = true
    const b = false
    if (d) {
    } else if (b) {
    } else if (b) {
    } else if (b) {
    } else {
    }
  },
  SET_LIST_PROYECTO_JUGADOR(state, payload) {
    state.listaProyectoJugador = payload
  }
}
export const actions = {
  listProyectosCurso({ commit }, payload) {
    this.$axios
      .get(`Jugador/ListarProyectoXCurso/${payload}`)
      .then((x) => {
        commit('SET_LIST_PROYECTOS_CURSOS', x.data)
      })
      .catch(() => {})
  },
  listJugadores({ commit }, payload) {
    this.$axios
      .get(`Jugador/ListarJugadores/${payload}`)
      .then((x) => {
        commit('SET_LIST_JUGADORES', x.data)
      })
      .catch(() => {})
  },
  listProyectosJugador({ commit }, payload) {
    this.$axios
      .get(`Jugador/ListarProyectoXJugador/${payload}`)
      .then((x) => {
        commit('SET_LIST_PROYECTO_JUGADOR', x.data)
      })
      .catch(() => {})
  }
}
export const getters = {
  calculo: (state) => (item) => {
    return parseInt((item.kpiTotal * item.ponderacion) / 100)
  },
  resumen: (state, getters) => {
    return {
      nombre: 'Total',
      kpiTotal: state.listaProyectoJugador.length
        ? state.listaProyectoJugador.reduce((x, y) => x + y.kpiTotal, 0) /
          state.listaProyectoJugador.length
        : 0,
      notaFinal: state.listaProyectoJugador.length
        ? state.listaProyectoJugador.reduce((x, y) => x + y.notaFinal, 0)
        : 0,
      tiempoFinal: state.listaProyectoJugador.length
        ? state.listaProyectoJugador.reduce((x, y) => x + y.tiempoJuego, 0)
        : 0
    }
  },
  jugadorData: (state) => {
    const data = state.listaProyectoJugador.length
      ? state.listaProyectoJugador[0]
      : {}
    return {
      name: data.nombreEstudiante + ' ' + data.apPat + ' ' + data.apMat
    }
  }
}
