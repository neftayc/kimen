export const state = () => ({
  cursosData: [],
  curso: [],
  cursoSelected: [],
  profesoresUniversitarios: [],
  notasCurso: {}
})
export const mutations = {
  SET_LIST_CURSOS(state, payload) {
    state.cursosData = payload
  },
  SET_CURSO_ID(state, payload) {
    state.curso = payload
  },
  SET_CURSO_DATA(state, payload) {
    state.cursoSelected = payload.cursoId ? [payload] : []
  },
  SET_PROFESORES_UNIVERSITARIOS(state, payload) {
    state.profesoresUniversitarios = payload
  },
  SET_LISTAR_NOTAS(state, payload) {
    state.notasCurso = payload
  },
  UPDATE_NOTAS(state, payload) {
    state.notasCurso = payload
  }
}
export const actions = {
  listCursos({ commit }) {
    this.$axios
      .get('Cursos/Listar')
      .then((x) => {
        commit('SET_LIST_CURSOS', x.data)
      })
      .catch(() => {})
  },
  selectCurso({ commit, dispatch }, payload) {
    this.$axios
      .get(`Cursos/select/${payload}`)
      .then((x) => {
        commit('SET_CURSO_DATA', x.data)
        dispatch('listProfesoresUniversitarios', x.data.universidadID)
      })
      .catch(() => {})
  },

  listProfesoresUniversitarios({ commit }, payload) {
    this.$axios
      .get(`Cursos/ListarProfUnive/${payload}`)
      .then((x) => {
        commit('SET_PROFESORES_UNIVERSITARIOS', x.data)
      })
      .catch(() => {})
  },
  listNotas({ commit }, payload) {
    return this.$axios
      .get(`Cursos/ListarNotas/${payload}`)
      .then((x) => {
        commit('SET_LISTAR_NOTAS', x.data)
      })
      .catch(() => {})
  },
  updateNotas({ commit }, payload) {
    this.$axios
      .put('Cursos/ModNotas', payload)
      .then((x) => {
        commit('UPDATE_NOTAS', x.data)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('Error', e)
      })
  },

  getCurso({ commit }, payload) {
    this.$axios
      .get(`Proyectos/ListarCurso/${payload}`)
      .then((x) => {
        commit('SET_CURSO_ID', x.data)
      })
      .catch(() => {})
  }
}
export const getters = {
  notasCursoG: (state) => {
    return state.notasCurso
  }
}
