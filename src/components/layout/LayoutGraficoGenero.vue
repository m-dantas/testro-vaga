<script>
import { Doughnut } from 'vue-chartjs'
import Api from '../../services/api.js'

export default {
  name: 'graficogenero',
  extends: Doughnut,
  data () {
    return {
      m: null,
      f: null
    }
  },
  mounted () {
    this.graphCountGenero()
  },
  methods: {
    async graphCountGenero () {
      const resM = await Api.deputadosPorSexo('M')
      this.m = resM.data.dados.length

      const resF = await Api.deputadosPorSexo('F')
      this.f = resF.data.dados.length

      this.renderChart(
        {
          labels: ['Masculino', 'Feminino'],
          datasets: [
            {
              backgroundColor: ['#029877', '#3cefc7'],
              data: [this.m, this.f]
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

<style lang="scss" scoped></style>
