export const state = () => ({
  cursosData: [],
  proyectosCurso: [],
  seccionCursoSelected: [],
  profesoresUniversitarios: [],
  notasCurso: {},
  cursoSeleccionado: {},
  loadingCursos: false
})
export const mutations = {
  SET_LIST_CURSOS(state, payload) {
    state.cursosData = payload
  },
  SELECTED_CURSO(state, payload) {
    state.cursoSeleccionado = state.cursosData.find(
      (x) => x.seccionCursoId === parseInt(payload)
    )
      ? state.cursosData.find((x) => x.seccionCursoId === parseInt(payload))
      : {}
  },
  SET_PROYECTOS_CURSO(state, payload) {
    state.proyectosCurso = payload
  },
  SET_SECCION_CURSO_DATA(state, payload) {
    state.seccionCursoSelected = payload
  },
  SET_PROFESORES_UNIVERSITARIOS(state, payload) {
    state.profesoresUniversitarios = payload
  },
  SET_LISTAR_NOTAS(state, payload) {
    state.notasCurso = payload
  },
  UPDATE_NOTAS(state, payload) {
    state.notasCurso = payload
  },
  CHANGE_LOADING(state, payload) {
    state.loadingCursos = payload
  }
}
export const actions = {
  async getCurso({ dispatch }, payload) {
    await dispatch('listCursos', payload)
  },
  listCursos({ commit, rootState }, payload) {
    commit('CHANGE_LOADING', true)
    commit('SET_LIST_CURSOS', [])
    this.$axios
      .get('cursos/listar', {
        params: {
          activos: true,
          idInstitucion: rootState.auth.user.idInstitucion
        }
      })
      .then(async (x) => {
        commit('CHANGE_LOADING', false)
        await commit('SET_LIST_CURSOS', x.data)
        if (payload) {
          await commit('SELECTED_CURSO', payload)
        }
      })
      .catch(() => {
        commit('CHANGE_LOADING', false)
      })
  },
  getProyectosCurso({ commit }, payload) {
    this.$axios
      .get('seccion/proyectos/listar', { params: { id: payload } })
      .then((x) => {
        commit('SET_PROYECTOS_CURSO', x.data)
      })
      .catch(() => {})
  },

  selectSeccionCurso({ commit, dispatch }, payload) {
    this.$axios
      .get('seccion/select', { params: { id: payload } })
      .then((x) => {
        commit('SET_SECCION_CURSO_DATA', x.data.usuarios)
        // dispatch('listProfesoresUniversitarios', x.data.universidadID)
      })
      .catch(() => {})
  }
}
export const getters = {
  notasCursoG: (state) => {
    return state.notasCurso
  },
  filterData: (state) => {
    const proyectos = []
    const fases = [{ id: '', nombre: 'Todos' }]

    for (let i = 0; i < state.seccionCursoSelected.length; i++) {
      const element = state.seccionCursoSelected[i]
      element.kpiProyectos.map((d) => {
        proyectos.push(d)
        d.fases.map((p) => {
          fases.push(p)
        })
      })
    }
    const hash = {}

    return {
      proyectos: proyectos
        .filter((o) => (hash[o.nombre] ? false : (hash[o.nombre] = true)))
        .sort((a, b) => (a.id > b.id ? 1 : -1)),
      fases: fases.filter((o) =>
        hash[o.nombre] ? false : (hash[o.nombre] = true)
      )
    }
  },
  loading: (state) => state.loadingCursos
}
