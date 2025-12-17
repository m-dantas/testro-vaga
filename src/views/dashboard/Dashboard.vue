<template>
  <div id="dashboard">
    <div class="md-layout md-gutter md-row">
      <layout-card>
        <template v-slot:icon>
          <md-icon class="md-size-2x">flag</md-icon>
        </template>
        <template v-slot:desc>
          <div class="container-card">
            <label class="card-title">PARTIDOS</label>
            <label class="card-value">{{ countPart }}</label>
          </div>
        </template>
      </layout-card>
      <layout-card>
        <template v-slot:icon>
          <md-icon class="md-size-2x">people</md-icon>
        </template>
        <template v-slot:desc>
          <div class="container-card">
            <label class="card-title">DEPUTADOS</label>
            <label class="card-value">{{ countDep }}</label>
          </div>
        </template>
      </layout-card>
    </div>
    <div class="graphics">
      <div class="graph">
        <label class="graph-title">Deputados</label>
        <grafico-deputados />
      </div>
      <div class="graph">
        <label class="graph-title">Quantidade de Deputados por gênero</label>
        <grafico-genero :width="250" :height="250" />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutCard from '../../components/layout/LayoutCard'
import GraficoDeputados from '../../components/layout/LayoutGraficoDeputados'
import GraficoGenero from '../../components/layout/LayoutGraficoGenero'
import { _ } from 'vue-underscore'
import Api from '../../services/api.js'
export default {
  name: 'dashboard',
  data () {
    return {
      countDep: null,
      countPart: null
    }
  },
  components: {
    LayoutCard,
    GraficoDeputados,
    GraficoGenero
  },
  mounted () {
    this.deputados()
    document.title = 'Dashboard'
  },
  methods: {
    async deputados () {
      await Api.deputados().then(res => {
        this.countDep = res.data.dados.length
        this.countPart = Object.keys(_.countBy(res.data.dados, 'siglaPartido')).length
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-row {
  padding-left: 15px;
}

.md-icon {
  color: white !important;
}

.container-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;

  .card-title {
    font-size: 13pt;
    color: #03644f;
  }

  .card-value {
    align-self: center;
    font-size: 24pt;
    margin: 15px;
    color: #128068;
    font-weight: bold;
  }
}

.graphics {
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12);
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  .graph {
    padding: 15px;

    label {
      font-size: 16pt;
    }
  }
}
</style>
