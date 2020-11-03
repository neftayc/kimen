<template>
  <v-container fluid>
    <div
      text
      style="cursor: pointer;"
      class="black--text font-weight-bold"
      @click="$router.go(-1)"
    >
      <v-icon color="primary darken-3" large>
        mdi-chevron-left
      </v-icon>
      Atrás
    </div>
    <v-container>
      <div class="text-center" style="position: relative;">
        <p class="mb-5">
          <strong>Detalles: </strong>
          <span>{{ cursoSeleccionado.descripcion }}</span>
        </p>
        <v-tooltip top color="grey darken-2">
          <template v-slot:activator="{ on }">
            <v-btn
              :min-width="0"
              :width="40"
              :height="40"
              absolute
              top
              right
              class="px-2 mt-n4 mr-n4 rounded-circle"
              depressed
              color="success"
              v-on="on"
              @click="showHeaderProject = !showHeaderProject"
            >
              <v-icon>{{
                showHeaderProject ? 'mdi-eye-off' : 'mdi-eye'
              }}</v-icon>
            </v-btn>
          </template>
          <span class="text-caption">{{
            showHeaderProject ? 'Ocultar Proyectos' : 'Mostrar Proyectos'
          }}</span>
        </v-tooltip>
      </div>
      <v-card v-if="showHeaderProject" :elevation="18" class="rounded">
        <v-data-table
          class="curso-table curso-table-proyectos"
          :headers="headerProyectoCurso"
          :items="proyectoList"
          hide-default-footer
          :items-per-page="100000"
        >
        </v-data-table>
      </v-card>
      <v-row v-if="!showProyectos" align="center" class="my-5">
        <v-col cols="12" sm="4">
          <v-switch
            v-if="listaJugadores.length"
            v-model="showProyectos"
            hide-details
            class="mr-4 mt-0"
            label="Detalles Proyectos"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="4">
          <p class="text-subtitle-1 font-weight-bold text-center mb-0">
            <v-icon color="black" class="mt-n2" left>mdi-account-group</v-icon>
            Lista de Estudiantes
          </p>
        </v-col>
        <v-col cols="12" sm="4"> </v-col>
      </v-row>
      <v-row v-if="showProyectos" class="my-5" align="center">
        <v-col cols="12" sm="6">
          <div class="d-flex justify-end align-end">
            <div>
              <v-switch
                v-model="showProyectos"
                class="mr-2 mt-0 mb-4"
                hide-details
              ></v-switch>
            </div>
            <div style="width: 300px;" class="text-center">
              <span
                class="d-block font-weight-bold mb-2"
                :class="showProyectos ? 'primary--text' : ''"
              >
                Detalle proyectos
              </span>
              <v-card flat class="transparent select-kimen">
                <v-select
                  v-model="selectedProject"
                  outlined
                  placeholder="Seleccionar Proyecto"
                  hide-details
                  :items="filterData.proyectos"
                  return-object
                  item-text="nombre"
                  class="rounded-pill elevation-20"
                >
                  <template slot="selection" slot-scope="{ item }">
                    <span class="text-caption"
                      >{{ item.id }} - {{ item.nombre }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="{ item }">
                    <span class="text-caption"
                      >{{ item.id }} - {{ item.nombre }}</span
                    >
                  </template>
                </v-select>
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex align-end">
            <div>
              <v-switch
                v-model="showFases"
                class="mr-2 mt-0 mb-4"
                hide-details
              ></v-switch>
            </div>
            <div style="width: 300px;" class="text-center">
              <span
                class="d-block font-weight-bold mb-2"
                :class="showFases ? 'primary--text' : ''"
              >
                Ver por fases
              </span>
              <v-card flat class="transparent select-kimen">
                <v-select
                  v-model="selectedFase"
                  outlined
                  placeholder="Seleccioanar Fase"
                  hide-details
                  item-text="nombre"
                  return-object
                  class="rounded-pill elevation-20"
                  :items="faseProyecto"
                  :disabled="!showFases"
                >
                  <template slot="selection" slot-scope="{ item }">
                    <span class="text-caption">{{ item.nombre }}</span>
                  </template>
                  <template slot="item" slot-scope="{ item }">
                    <span class="text-caption"> {{ item.nombre }}</span>
                  </template></v-select
                >
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
      <h3 v-if="showProyectos" class="text-subtitle-1 font-weight-bold mb-2">
        <v-icon color="black" class="mt-n2" left>mdi-account-group</v-icon>
        Lista de Estudiantes
      </h3>
      <v-card :elevation="18" class="rounded">
        <v-data-table
          class="curso-table"
          :headers="headerEstudiantes"
          :items="listaJugadores"
          hide-default-footer
          dense
          :items-per-page="100000"
        >
          <!--ITEMS DE FASES-->
          <template v-slot:item.fase="{ item }">
            <!--Aqui se debe mostrar el proyecto del estudiante que esta en proceso-->
            <v-list-item
              v-if="
                item.kpiProyectos.find((x) => selectedProject.id === x.id) &&
                showFases
              "
              class="px-0"
            >
              <v-list-item-content
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length
                "
              >
                <v-list-item-title class="text-body-2">
                  {{
                    item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id)
                      ? item.kpiProyectos
                          .find((x) => selectedProject.id === x.id)
                          .fases.find((d) => d.id === selectedFase.id).nombre
                      : '- - - -'
                  }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.fase_kpi_plazo="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos
                    .find((x) => selectedProject.id === x.id)
                    .fases.find((d) => d.id === selectedFase.id)
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos
                          .find((x) => selectedProject.id === x.id)
                          .fases.find((d) => d.id === selectedFase.id).kpiData
                          .kpiCostoAdquirido +
                          item.kpiProyectos
                            .find((x) => selectedProject.id === x.id)
                            .fases.find((d) => d.id === selectedFase.id).kpiData
                            .kpiPlazoAdquirido +
                          item.kpiProyectos
                            .find((x) => selectedProject.id === x.id)
                            .fases.find((d) => d.id === selectedFase.id).kpiData
                            .kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id).kpiData
                      .kpiPlazoAdquirido
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.fase_kpi_costo="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos
                    .find((x) => selectedProject.id === x.id)
                    .fases.find((d) => d.id === selectedFase.id)
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos
                          .find((x) => selectedProject.id === x.id)
                          .fases.find((d) => d.id === selectedFase.id).kpiData
                          .kpiCostoAdquirido +
                          item.kpiProyectos
                            .find((x) => selectedProject.id === x.id)
                            .fases.find((d) => d.id === selectedFase.id).kpiData
                            .kpiPlazoAdquirido +
                          item.kpiProyectos
                            .find((x) => selectedProject.id === x.id)
                            .fases.find((d) => d.id === selectedFase.id).kpiData
                            .kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id).kpiData
                      .kpiCostoAdquirido
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.fase_kpi_satisfaccion="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos
                    .find((x) => selectedProject.id === x.id)
                    .fases.find((d) => d.id === selectedFase.id)
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos
                          .find((x) => selectedProject.id === x.id)
                          .fases.find((d) => d.id === selectedFase.id).kpiData
                          .kpiCostoAdquirido +
                          item.kpiProyectos
                            .find((x) => selectedProject.id === x.id)
                            .fases.find((d) => d.id === selectedFase.id).kpiData
                            .kpiPlazoAdquirido +
                          item.kpiProyectos
                            .find((x) => selectedProject.id === x.id)
                            .fases.find((d) => d.id === selectedFase.id).kpiData
                            .kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id).kpiData
                      .kpiSatisfaccionAdquirido
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.faseKPITotal="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos
                    .find((x) => selectedProject.id === x.id)
                    .fases.find((d) => d.id === selectedFase.id)
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id).kpiTotal
                  "
                  :kpi="
                    item.kpiProyectos
                      .find((x) => selectedProject.id === x.id)
                      .fases.find((d) => d.id === selectedFase.id).kpiTotal
                  "
                />
              </div>
            </div>
          </template>
          <!--FASES-->
          <template v-slot:item.fase_1="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases[0]
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[0].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[0].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[0].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[0].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[0].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[0].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.fase_2="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases[1]
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[1].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[1].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[1].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[1].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[1].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[1].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.fase_3="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases[2]
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[2].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[2].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[2].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[2].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[2].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[2].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.fase_4="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases[3]
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[3].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[3].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[3].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[3].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[3].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[3].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.fase_5="{ item }">
            <div
              v-if="item.kpiProyectos.find((x) => selectedProject.id === x.id)"
            >
              <div
                v-if="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases.length &&
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .fases[4]
                "
              >
                <ItemProjectKPI
                  :estado="selectedProject.finalizado"
                  :kpi-total="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[4].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[4].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[4].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                  :kpi="
                    parseInt(
                      (
                        (item.kpiProyectos.find(
                          (x) => selectedProject.id === x.id
                        ).fases[4].kpiData.kpiCostoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[4].kpiData.kpiPlazoAdquirido +
                          item.kpiProyectos.find(
                            (x) => selectedProject.id === x.id
                          ).fases[4].kpiData.kpiSatisfaccionAdquirido) /
                        3
                      ).toFixed()
                    )
                  "
                />
              </div>
            </div>
          </template>
          <template v-slot:item.faseTotal="{ item }">
            <div
              v-if="
                item.kpiProyectos.find((x) => selectedProject.id === x.id).fases
                  .length &&
                item.kpiProyectos.find((x) => selectedProject.id === x.id)
                  .finalizado
                  ? true
                  : item.kpiProyectos.find((x) => selectedProject.id === x.id)
                      .kpiTotal
              "
            >
              <ItemProjectKPI
                :estado="selectedProject.finalizado"
                :kpi-total="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .kpiTotal
                "
                :kpi="
                  item.kpiProyectos.find((x) => selectedProject.id === x.id)
                    .kpiTotal
                "
              />
            </div>
          </template>

          <!--ITEMS DE PROYECTOS-->
          <template v-slot:item.Proy1="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[0] : {}"
            />
          </template>
          <template v-slot:item.Proy2="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[1] : {}"
            />
          </template>
          <template v-slot:item.Proy3="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[2] : {}"
            />
          </template>
          <template v-slot:item.Proy4="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[3] : {}"
            />
          </template>
          <template v-slot:item.Proy5="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[4] : {}"
            />
          </template>
          <template v-slot:item.Proy6="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[5] : {}"
            />
          </template>
          <template v-slot:item.Proy7="{ item }">
            <ItemProject
              :proyecto="item.kpiProyectos.length ? item.kpiProyectos[6] : {}"
            />
          </template>
          <template v-slot:item.kpiPromedioTotal="{ item }">
            <v-progress-circular
              class="my-2"
              :rotate="-90"
              :size="50"
              :width="7"
              :value="item.kpiPromedioTotal"
              :color="getColor(item.kpiPromedioTotal)"
            >
              {{ item.kpiPromedioTotal }}%
            </v-progress-circular>
          </template>
          <!--Other datos-->
          <template v-slot:item.proyecto="{ item }">
            <!--Aqui se debe mostrar el proyecto del estudiante que esta en proceso-->
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title
                  style="white-space: normal;"
                  class="text-body-2"
                >
                  {{
                    item.kpiProyectos.length
                      ? item.kpiProyectos.find(
                          (x) => x.id === selectedProject.id
                        ).id
                      : ''
                  }}
                  -
                  {{
                    item.kpiProyectos.length
                      ? item.kpiProyectos.find(
                          (x) => x.id === selectedProject.id
                        ).nombre
                      : ''
                  }}
                  <span
                    v-if="item.kpiProyectos.length"
                    class="text-caption font-weight-bold"
                    :class="
                      item.kpiProyectos.find((x) => x.id === selectedProject.id)
                        .finalizado
                        ? 'error--text'
                        : 'primary--text'
                    "
                    >{{
                      item.kpiProyectos.find((x) => x.id === selectedProject.id)
                        .finalizado
                        ? 'Finalizado'
                        : 'En proceso'
                    }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.proyecto_kpi_plazo="{ item }">
            <ItemProjectKPI
              :kpi-total="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .kpiTotal
              "
              :estado="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
              "
              :kpi="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  ? item.kpiProyectos.find((x) => x.id === selectedProject.id)
                      .kpiProyecto.kpiPlazoAdquirido
                  : 0
              "
            />
          </template>
          <template v-slot:item.proyecto_kpi_costo="{ item }">
            <ItemProjectKPI
              :estado="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
              "
              :kpi-total="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .kpiTotal
              "
              :kpi="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  ? item.kpiProyectos.find((x) => x.id === selectedProject.id)
                      .kpiProyecto.kpiCostoAdquirido
                  : 0
              "
            />
          </template>
          <template v-slot:item.proyecto_kpi_satisfaccion="{ item }">
            <ItemProjectKPI
              :estado="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
              "
              :kpi-total="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .kpiTotal
              "
              :kpi="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  ? item.kpiProyectos.find((x) => x.id === selectedProject.id)
                      .kpiProyecto.kpiSatisfaccionAdquirido
                  : 0
              "
            />
          </template>
          <template v-slot:item.proyectoKPITotal="{ item }">
            <ItemProjectKPI
              v-if="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
                  ? true
                  : item.kpiProyectos.find((x) => x.id === selectedProject.id)
                      .kpiTotal
              "
              :estado="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .finalizado
              "
              :kpi-total="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .kpiTotal
              "
              :kpi="
                item.kpiProyectos.find((x) => x.id === selectedProject.id)
                  .kpiTotal
              "
            />
          </template>
          <!--Actions-->
          <template v-slot:item.actions="{ item }">
            <v-tooltip top color="grey darken-2">
              <template v-slot:activator="{ on }">
                <v-btn
                  min-width="0"
                  class="px-2 mx-1 rounded-circle"
                  small
                  height="35"
                  width="35"
                  color="success"
                  @click="goToDesempenho(item)"
                  v-on="on"
                >
                  <v-icon>mdi-account-star</v-icon>
                </v-btn>
              </template>
              <span>Desempeño Individual</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemProject from '@/components/ItemProject'
import ItemProjectKPI from '@/components/ItemProjectKPI'
export default {
  components: { ItemProject, ItemProjectKPI },
  async fetch({ store, params }) {
    // await store.dispatch('jugadores/listProyectosCurso', params.idCurso)
    await store.dispatch('cursos/getCurso', params.idCurso)
    await store.dispatch('cursos/selectSeccionCurso', params.idCurso)
    await store.dispatch('cursos/getProyectosCurso', params.idCurso)
    await store.commit('CHANGE_PAGE_TITLE', {
      title: 'Curso - Desempeño de Estudiantes',
      subtitle:
        'Curso: ' +
        store.state.cursos.cursoSeleccionado.nombre +
        ' - ' +
        store.state.cursos.cursoSeleccionado.seccion
    })
  },
  data: (vm) => ({
    showHeaderProject: true,
    showProyectos: false,
    showFases: false,
    selectedProject: {},
    selectedFase: { id: '', nombre: 'Todos' },
    headerProyectoCurso: [
      {
        text: 'Código',
        value: 'id',
        sortable: false,
        align: 'center',
        width: 100
      },
      { text: 'Nombre', value: 'nombre', sortable: false },
      {
        text: 'Tipo',
        value: 'tipoProyecto',
        sortable: false
      }
    ],

    headerEstudiantesCurso: [
      {
        text: 'Id',
        value: 'idEstudiante',
        sortable: false,
        align: 'center',
        width: 50
      },
      {
        text: 'Apellidos y Nombres',
        value: 'nombreApellido',
        sortable: false
      },
      {
        text: 'Proyecto',
        value: 'proyecto',
        sortable: false
      },
      {
        text: 'Fase',
        value: 'fase',
        sortable: false,
        width: 100
      },
      {
        text: 'KPIs Fase - Total',
        value: 'faseKPITotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Fase - Total',
        value: 'faseTotal',
        sortable: false,
        align: 'center',
        width: 100
      },

      {
        text: 'Proyecto - Total',
        value: 'proyectoKPITotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'KPI Total Promedio',
        value: 'kpiPromedioTotal',
        sortable: false,
        align: 'center',
        width: 100
      },
      {
        text: 'Acciones',
        value: 'actions',
        sortable: false,
        align: 'center',
        width: 100
      }
    ],
    headerFases: [],
    faseProyecto: [{ id: '', nombre: 'Todos' }]
  }),
  computed: {
    ...mapState({
      cursoSeleccionado: (state) => state.cursos.cursoSeleccionado,
      proyectoList: (state) => state.cursos.proyectosCurso,
      headerProyectoCursoItems: (state) =>
        state.jugadores.headerProyectoCursoItems,
      listaJugadores: (state) =>
        JSON.parse(JSON.stringify(state.cursos.seccionCursoSelected))
    }),
    ...mapGetters('cursos', ['filterData']),
    headerEstudiantes() {
      if (
        this.showProyectos &&
        this.selectedProject.id &&
        this.showFases &&
        this.selectedFase.id
      ) {
        console.log('Vista de Detalle de una FASE', 4)
        return this.headerEstudiantesFaseDetail
      } else if (
        this.showProyectos &&
        this.selectedProject.id &&
        this.showFases &&
        !this.selectedFase.id
      ) {
        console.log('Vista por fase', 3)
        return this.headerEstudiantesFases
      } else if (
        this.showProyectos &&
        this.selectedProject.id &&
        !this.showFases &&
        !this.selectedFase.id
      ) {
        console.log('vista de detall de un proyecto', 2)
        return this.headerEstudiantesProyectoDetail
      } else {
        console.log(1)
        return this.headerEstudiantesProyectos
      }
    },
    // Vista por proyectos
    headerEstudiantesProyectos() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'proyecto' &&
              x.value !== 'proyectoKPITotal' &&
              x.value !== 'fase' &&
              x.value !== 'faseKPITotal' &&
              x.value !== 'faseTotal'
          )
        )
      )
      for (let i = 0; i < this.filterData.proyectos.length; i++) {
        const pro = this.filterData.proyectos[i]
        d.splice(2 + i, 0, {
          text: pro.id,
          value: pro.id,
          align: 'center',
          sortable: false
        })
      }
      return d
    },
    // Vista por details poryecto
    headerEstudiantesProyectoDetail() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'kpiPromedioTotal' &&
              x.value !== 'faseKPITotal' &&
              x.value !== 'fase' &&
              x.value !== 'faseTotal'
          )
        )
      )
      d.splice(3, 0, {
        text: 'KPI Plazo ',
        value: 'proyecto_kpi_plazo',
        align: 'center',
        width: 100,
        sortable: false
      })
      d.splice(4, 0, {
        text: 'KPI Costo ',
        value: 'proyecto_kpi_costo',
        align: 'center',
        width: 100,
        sortable: false
      })
      d.splice(4, 0, {
        text: 'KPI Satisfacción ',
        value: 'proyecto_kpi_satisfaccion',
        align: 'center',
        width: 100,
        sortable: false
      })
      return d
    },
    // Vista por fases
    headerEstudiantesFases() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'kpiPromedioTotal' &&
              x.value !== 'proyectoKPITotal' &&
              x.value !== 'fase' &&
              x.value !== 'faseKPITotal'
          )
        )
      )
      const count = this.selectedProject.fases.length
      d.splice(1, 1, {
        text: 'Apellidos y Nombres',
        value: 'nombreApellido',
        sortable: false,
        width: count > 5 ? 120 : 180
      })
      d.splice(2, 1, {
        text: 'Proyecto',
        value: 'proyecto',
        sortable: false,
        width: count > 5 ? 200 : 300
      })
      for (let i = 0; i < this.selectedProject.fases.length; i++) {
        const f = this.selectedProject.fases[i]
        d.splice(3 + i, 0, {
          text: f.nombre,
          value: 'fase_' + (i + 1),
          align: 'center',
          sortable: false
        })
      }
      return d
    },
    // Vista por details fase
    headerEstudiantesFaseDetail() {
      const d = JSON.parse(
        JSON.stringify(
          this.headerEstudiantesCurso.filter(
            (x) =>
              x.value !== 'kpiPromedioTotal' &&
              x.value !== 'proyectoKPITotal' &&
              x.value !== 'faseTotal'
          )
        )
      )
      d.splice(1, 1, {
        text: 'Apellidos y Nombres',
        value: 'nombreApellido',
        sortable: false,
        width: 200
      })
      d.splice(2, 1, {
        text: 'Proyecto',
        value: 'proyecto',
        sortable: false
      })

      d.splice(4, 0, {
        text: 'Fase KPI Plazo ',
        value: 'fase_kpi_plazo',
        align: 'center',
        sortable: false
      })
      d.splice(5, 0, {
        text: 'Fase KPI Costo ',
        value: 'fase_kpi_costo',
        align: 'center',
        sortable: false
      })
      d.splice(6, 0, {
        text: 'Fase KPI Satisfacción ',
        value: 'fase_kpi_satisfaccion',
        align: 'center',
        sortable: false
      })
      return d
    }
  },
  watch: {
    showProyectos(v) {
      if (v) {
        this.selectedProject = JSON.parse(
          JSON.stringify(
            this.$store.state.cursos.seccionCursoSelected[0].kpiProyectos[0]
          )
        )
      } else {
        this.showFases = false
        this.selectedFase = { id: '', nombre: 'Todos' }
      }
    },
    selectedProject(v) {
      if (v.id) {
        console.log(v.fases)
        this.faseProyecto = JSON.parse(JSON.stringify(v.fases))
        this.faseProyecto.splice(0, 0, { id: '', nombre: 'Todos' })
        this.selectedFase = { id: '', nombre: 'Todos' }
      }
    },
    showFases(v) {
      if (!v) {
        this.selectedFase = { id: '', nombre: 'Todos' }
      }
    },
    selectedFase(v) {
      if (v) {
        console.log(v)
      }
    }
  },
  mouted() {},
  methods: {
    getColor(x) {
      if (x >= 80) return '#2BBE21'
      else if (x >= 50 && x < 80) return '#ffdf00'
      else if (x < 50) return '#D62D2D'
    },
    goToDesempenho(item) {
      this.$router.push(`desempenho-estudiantes/${item.idEstudiante}`)
    }
  }
}
</script>
<style lang="scss">
.select-kimen {
  .v-input {
    &__slot {
      padding: 0 20px !important;
      & fieldset {
        color: transparent !important;
      }
      & label {
        font-size: 1.2rem !important;
        color: rgb(0, 0, 0, 0.55);
        font-weight: normal;
      }
      & label.v-label--active {
        font-size: 1.2rem !important;
        top: 4px !important;
      }
    }
    & input {
      display: none;
    }
    &__icon--append i {
      font-size: 2rem !important;
      color: var(--v-primary-base) !important;
    }
  }
}

.curso-table-proyectos.curso-table {
  table thead th {
    height: 40px !important;
    font-size: 0.8rem !important;
  }
  table tbody td {
    font-size: 0.8rem !important;
  }
}
</style>
