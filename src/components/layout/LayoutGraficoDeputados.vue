<script>
import { _ } from 'vue-underscore'
import { Bar } from 'vue-chartjs'
import Api from '../../services/api.js'

export default {
  name: 'graficosdeputados',
  extends: Bar,
  data () {
    return {
      partidos: []
    }
  },
  mounted () {
    this.graphCountPartidos()
  },
  methods: {
    async graphCountPartidos () {
      // Pega todos os deputados
      const res = await Api.deputados()
      // Conta quantos deputados por partido usando underscore
      this.partidos = _.countBy(res.data.dados, 'siglaPartido')

      // Renderiza o gráfico
      this.renderChart(
        {
          labels: Object.keys(this.partidos),
          datasets: [
            {
              label: 'Número de Deputados por Partido',
              backgroundColor: '#14f0c0',
              data: Object.values(this.partidos)
            }
          ]
        },
        {
          responsive: true
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
/* Estilos do gráfico podem ser adicionados aqui */
</style>
