<template>
  <div>
    <md-card class="md-elevation-1" style="margin-bottom: 10px;">
      <div class="md-title" style="padding: 10px 15px 0px 15px;">
        Filtros
      </div>
      <div class="md-layout md-gutter md-row" style="padding: 0px 15px 0px 15px;">
        <div class="md-layout-item md-large-size-30 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
          <md-field>
            <label for="search">Nome do Parlamentar</label>
            <md-input v-model="search" id="search"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-large-size-20 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
          <md-field>
            <label for="partidos">Filtrar por partido</label>
            <md-select v-model="partido" id="partidos">
              <md-option value="">Todos</md-option>
              <md-option :key="index" :value="item" v-for="(item, index) in this.partidoSigla">
                {{ item }}
              </md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-large-size-20 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
          <md-field>
            <label for="estado">Filtrar por estado</label>
            <md-select v-model="estado" id="estado">
              <md-option value="">Todos</md-option>
              <md-option :key="index" :value="item.sigla" v-for="(item, index) in this.estadosUf">
                {{ item.nome }}
              </md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-large-size-20 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
          <md-field>
            <label for="font">Ordenar por</label>
            <md-select v-model="order" name="font" id="font">
              <md-option value="">Todos</md-option>
              <md-option value="nome">Nome</md-option>
              <md-option value="maior">Maior</md-option>
              <md-option value="menor">Menor</md-option>
            </md-select>
          </md-field>
        </div>
        <md-button class="md-dense md-raised md-primary" @click="buscar()">BUSCAR</md-button>
      </div>
    </md-card>
    <div class="md-layout md-gutter md-row">
      <div :key="index" v-for="(item, index) in deputados.dados"
        class="md-layout-item md-large-size-33 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <card-deputado v-bind:id_deputado="item.id" v-bind:title="item.nome" v-bind:subtitle="item.siglaPartido"
          v-bind:srcImage="item.urlFoto" />
      </div>
    </div>
    <div class="md-layout md-gutter md-row">
      <div class="pagination">
        <button :disabled="currentPage == 1" @click="buscar(1)">First</button>
        <button :disabled="currentPage == 1" @click="buscar(currentPage - 1)">Prev</button>
        <button>{{ currentPage }}/{{ totalpages }}</button>
        <button :disabled="currentPage == totalpages" @click="buscar(currentPage + 1)">Next</button>
        <button @click="buscar(totalpages)">Last</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardDeputado from './LayoutCardDeputado'
import { _ } from 'vue-underscore'
import Api from '../../services/api'
export default {
  name: 'LayoutFilter',
  components: {
    CardDeputado
  },
  data () {
    return {
      partido: '',
      order: '',
      estado: '',
      search: '',
      deputados: '',
      estadosUf: '',
      partidoSigla: '',
      currentPage: 0,
      totalpages: 0
    }
  },
  mounted () {
    this.buscar()
    this.siglas()
  },
  methods: {
    async buscar (number = 1) {
      await Api.deputadosByItens(this.search, this.estado, this.partido, this.order, number).then(res => {
        this.deputados = res.data
        this.totalpages = this.splitLink(res.data.links[3])
        this.currentPage = number
      })
    },
    async siglas () {
      await Api.estadosUF().then(res => {
        this.estadosUf = res.data.dados
      })
      await Api.deputados().then(res => {
        this.partidoSigla = Object.keys(_.groupBy(res.data.dados, 'siglaPartido'))
      })
    },
    splitLink (link) {
      let all = []
      all = link['href'].split('&')
      all = all[5].split('=')
      return +all[1]
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  margin: 15px;
  justify-content: flex-end;
  width: 95%;
}

.pagination button {
  border: none;
  color: black;
  background-color: rgb(241, 239, 239);
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  margin: 0px 0px 10px 0px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
}

.pagination a.active {
  background-color: dodgerblue;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
