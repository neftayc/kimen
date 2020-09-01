export const state = () => ({
  listaInstitucion: [],
  listaCursos: [],
  cursoData: {
    id: 1,
    institucion: 'Institución N° 1',
    name: 'Ingeniería de Software',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
    codigo: 'ING-SOFT-10',
    area: '--------',
    status: true
  },
  listaSecciones: [
    {
      codigo: 'ING-SOFT-10-A',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      start_date: '12-08-2020',
      end_date: '31-12-2020',
      comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      status: true
    },
    {
      codigo: 'ING-SOFT-10-B',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      start_date: '12-08-2020',
      end_date: '31-12-2020',
      comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      status: true
    },
    {
      codigo: 'ING-SOFT-10-C',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      start_date: '12-08-2020',
      end_date: '31-12-2020',
      comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      status: false
    },
    {
      codigo: 'ING-SOFT-10-D',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      start_date: '12-08-2020',
      end_date: '31-12-2020',
      comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      status: true
    }
  ],
  listaUsuarios: [
    {
      apellidos: 'Ccana Yucra, Rosbel Neftali ',
      email: 'rusbel.ccana@gmail.com',
      institucion: true,
      type: 'Docente',
      secciones: 8
    },
    {
      apellidos: 'Ccana Yucra, Rosbel Neftali ',
      email: 'rusbel.ccana@gmail.com',
      institucion: true,
      type: 'Docente',
      secciones: 15
    },
    {
      apellidos: 'Ccana Yucra, Rosbel Neftali ',
      email: 'rusbel.ccana@gmail.com',
      institucion: true,
      type: 'Docente',
      secciones: 10
    },
    {
      apellidos: 'Ccana Yucra, Rosbel Neftali ',
      email: 'rusbel.ccana@gmail.com',
      institucion: true,
      type: 'Docente',
      secciones: 7
    },
    {
      apellidos: 'Ccana Yucra, Rosbel Neftali ',
      email: 'rusbel.ccana@gmail.com',
      institucion: true,
      type: 'Docente',
      secciones: 10
    }
  ]
})

export const mutations = {
  SET_DATA_INSTITUCIONES(state, payload) {
    state.listaInstitucion = payload
  },
  SET_DATA_CURSOS(state, payload) {
    state.listaCursos = payload
  }
}
export const actions = {
  // save institucion
  listarInstituciones({ commit }, payload) {
    this.$axios
      .get('institucion/listar/', payload)
      .then((x) => {
        commit('SET_DATA_INSTITUCIONES', x.data)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  saveInstitucion({ commit }, payload) {
    this.$axios
      .post('institucion/crear/', payload)
      .then((x) => {
        console.log('=================saveInstitucion===================')
        console.log(x)
        console.log('=================saveInstitucion===================')
      })
      .catch((e) => {
        console.log(e)
      })
  },
  // save curso

  listarCursos({ commit }, payload) {
    this.$axios
      .get('cursos/listar/', payload)
      .then((x) => {
        commit('SET_DATA_CURSOS', x.data)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  saveCurso({ commit }, payload) {
    this.$axios
      .post('cursos/crear/', payload)
      .then((x) => {
        commit('SET_DATA_CURSOS', x.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  // save detalle curso
  // otro
}
