export const state = () => ({
  cursosData: [],
  proyectosCurso: [],
  seccionCursoSelected: [],
  profesoresUniversitarios: [],
  notasCurso: {},
  cursoSeleccionado: {}
})
export const mutations = {
  SET_LIST_CURSOS(state, payload) {
    state.cursosData = payload
  },
  SELECTED_CURSO(state, payload) {
    console.log(payload)
    console.log(state.cursosData)
    console.log(
      state.cursosData.find((x) => x.seccionCursoId === parseInt(payload))
    )

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
  }
}
export const actions = {
  async getCurso({ dispatch }, payload) {
    await dispatch('listCursos', payload)
  },
  listCursos({ commit, rootState }, payload) {
    this.$axios
      .get('cursos/listar', {
        params: {
          activos: true,
          idInstitucion: rootState.auth.user.idInstitucion
        }
      })
      .then(async (x) => {
        await commit('SET_LIST_CURSOS', x.data)
        if (payload) {
          await commit('SELECTED_CURSO', payload)
        }
      })
      .catch(() => {})
  },
  getProyectosCurso({ commit }, payload) {
    this.$axios
      .get('seccion/proyectos/listar', { params: { id: payload } })
      .then((x) => {
        commit('SET_PROYECTOS_CURSO', x.data.proyectos)
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
  },
  // APIS EN PRUEBA
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
  }
}
