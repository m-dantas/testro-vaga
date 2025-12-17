<template>
  <div>
    <div class="md-layout md-gutter md-row">
      <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <md-card>
          <div class="info__deputado">
            <img :src="lastStatus.urlFoto">
            <div class="nome__deputado">
              <label>Deputado: {{ lastStatus.nome }}</label>
            </div>
            <div class="partido__deputado">
              <label>Sigla do Partido: {{ lastStatus.siglaPartido }}</label>
            </div>
            <md-card>
              <md-tabs class="md-primary" md-alignment="centered">
                <md-tab id="tab-home" md-label="DADOS GERAIS">
                  <div class="nome__deputado">
                    <h3>Dados</h3>
                    <p>nome cívil: {{ deputado.nomeCivil }}</p>
                    <p>situação: {{ lastStatus.situacao }}</p>
                    <p>cpf: {{ deputado.cpf }}</p>
                    <p>escolaridade: {{ deputado.escolaridade }}</p>
                    <p>condição eleitoral: {{ lastStatus.condicaoEleitoral }}</p>
                    <p>e-mail: {{ lastStatus.email }}</p>
                    <h3>gabinete</h3>
                    <p>andar: {{ lastStatus.gabinete.andar }}</p>
                    <p>sala: {{ lastStatus.gabinete.sala }}</p>
                    <p>telefone: {{ lastStatus.gabinete.telefone }}</p>
                  </div>
                </md-tab>
                <md-tab id="tab-pages" md-label="DESPESAS">
                  <div class="pagination-filter">
                    <md-card>
                      <div class="md-title">
                        Filtros
                        <p>
                          Obs: Mês 1 referente a Janeiro de 2019 não possui despesas para nenhum deputado.
                        </p>
                      </div>
                      <div class="md-layout md-gutter" style="padding: 0px 15px 0px 15px;">
                        <div
                          class="md-layout-item md-large-size-30 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                          <md-field>
                            <label for="mes">Mês</label>
                            <md-input v-model="mes" id="mes"></md-input>
                          </md-field>
                        </div>
                        <div
                          class="md-layout-item md-large-size-30 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                          <md-field>
                            <label for="ano">Ano</label>
                            <md-input v-model="ano" id="ano"></md-input>
                          </md-field>
                        </div>
                        <md-button class="md-dense md-raised md-primary"
                          @click="getDespesas(id_deputado, 1)">BUSCAR</md-button>
                      </div>
                      <div id="pagination-button">
                        <button :disabled="currentPage == 1" @click="getDespesas(id_deputado, 1)">First</button>
                        <button :disabled="currentPage == 1"
                          @click="getDespesas(id_deputado, currentPage - 1)">Prev</button>
                        <button>
                          <template v-if="currentPage == totalpages + 1">
                            {{ currentPage }}/{{ totalpages + 1 }}
                          </template>
                          <template v-else>
                            {{ currentPage }}/{{ totalpages }}
                          </template>
                        </button>
                        <button :disabled="currentPage - 1 == totalpages"
                          @click="getDespesas(id_deputado, currentPage + 1)">Next</button>
                        <button @click="getDespesas(id_deputado, totalpages)">Last</button>
                      </div>
                    </md-card>
                  </div>
                  <md-table v-model="despesas" md-sort="name" md-sort-order="asc" md-card>
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                      <md-table-cell md-label="COD">{{ item.codDocumento }}</md-table-cell>
                      <md-table-cell md-label="Tipo de Despesa">{{ item.tipoDespesa }}</md-table-cell>
                      <md-table-cell md-label="Valor Líquido">R$ {{ item.valorLiquido }}</md-table-cell>
                      <md-table-cell md-label="Mês e Ano">{{ item.mes }}/{{ item.ano }}</md-table-cell>
                      <md-table-cell md-label="Tipo de documento">{{ item.tipoDocumento }}</md-table-cell>
                      <md-table-cell md-label="VER RECIBO">
                        <a :href="item.urlDocumento" target="_blank">
                          <md-icon>remove_red_eye</md-icon>
                        </a>
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                </md-tab>
              </md-tabs>
            </md-card>
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../services/api'
export default {
  name: 'details-deputado',
  data () {
    return {
      id_deputado: this.$attrs.id,
      deputado: [],
      despesas: [],
      lastStatus: [],
      totalpages: 0,
      currentPage: 0,
      mes: '',
      ano: ''
    }
  },
  created () {
    this.getDeputado(this.id_deputado)
    this.getDespesas(this.id_deputado, 1)
  },
  methods: {
    async getDeputado (id) {
      await Api.deputadoId(id).then(res => {
        this.deputado = res.data.dados
        this.showDialog = true
        this.lastStatus = this.deputado.ultimoStatus
        document.title = `Deputado: ` + this.deputado.ultimoStatus.nome
      }).catch(error => {
        if (error) {
          alert('Ocorreu algum erro, tente mais tarde')
        }
      })
    },
    async getDespesas (id, number = 1) {
      await Api.deputadoDespesas(id, this.mes, this.ano, number).then(res => {
        this.despesas = res.data.dados
        this.totalpages = this.splitLink(res.data.links[3])
        this.currentPage = number
      }).catch(error => {
        if (error) {
          alert('Ocorreu algum erro, tente mais tarde')
        }
      })
    },
    splitLink (link) {
      let all = []
      all = link['href'].split('&')
      all = all[4].split('=')
      return +all[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.info__deputado {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;

  img {
    height: 150px;
    align-self: center;
  }
}

.nome__deputado {
  padding: 8px;
  align-self: center;
  text-transform: uppercase;

  label {
    font-size: 16pt;
  }
}

.partido__deputado {
  padding: 5px;
  align-self: center;

  label {
    font-size: 12pt;
  }
}

#pagination-button {
  width: 95%;
  display: flex;
  justify-content: flex-end;

  button {
    border: none;
    color: black;
    background-color: rgb(241, 239, 239);
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    margin: 0px 0px 10px 0px;
    align-self: center;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
    }
  }
}

#filtros {
  width: 100%;
  padding: 0px 15px;
}

a {
  text-decoration: none;
}

.md-icon {
  &:hover {
    color: rgba(68, 138, 255, 0.8);
  }
}

.md-card {
  margin-bottom: 5px;
}

.md-title {
  padding: 10px 15px 0px 15px;

  p {
    font-size: 10pt;
  }
}
</style>
