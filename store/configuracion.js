export const state = () => ({
  listaInstitucion: [
    {
      logo: require('@/static/logo.png'),
      name: 'Institución N° 1',
      description: 'Lorem ipsum dolor, sit amet consectetur  ',
      type: 'Universidad',
      pais: 'Perú'
    },
    {
      logo: require('@/static/logo.png'),
      name: 'Institución N° 2',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam doloremque quaerat quo sunt ',
      type: 'Universidad',
      pais: 'Colombia'
    },
    {
      logo: require('@/static/logo.png'),
      name: 'Institución N° 3',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      type: 'Universidad',
      pais: 'España'
    },
    {
      logo: require('@/static/logo.png'),
      name: 'Institución N° 4',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      type: 'Colegio',
      pais: 'Chile'
    }
  ],
  listaCursos: [
    {
      id: 1,
      institucion: 'Institución N° 1',
      name: 'Ingeniería de Software',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      codigo: 'ING-SOFT-A',
      area: '--------',
      status: true
    },
    {
      id: 2,
      institucion: 'Institución N° 2',
      name: 'Arquitectura de Software',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      codigo: 'ARQ-SOFT-A',
      area: '--------',
      status: true
    },
    {
      id: 3,
      institucion: 'Institución N° 3',
      name: 'Proceso',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.  ',
      codigo: 'PROC-A',
      area: '--------',
      status: false
    }
  ],
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
