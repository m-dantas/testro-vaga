<template>
  <div id="deputados">
    <div class="filtros">
      <filtros />
    </div>
  </div>
</template>

<script>
import Filtros from '../../components/layout/LayoutFilter'
export default {
  name: 'deputados',
  components: {
    Filtros
  },
  mounted () {
    document.title = 'Deputados'
  }
}
</script>

<style lang="scss" scoped></style>
