<template>
  <div id="layout-card">
    <div class="md-layout-item md-large-size-100 md-medium-size-80 md-small-size-100 md-xsmall-size-100">
      <div class="card-personalizado md-elevation-3">
        <div class="icon-personalizado">
          <slot name="icon"></slot>
        </div>
        <md-content class="md-default">
          <slot class="md-title" name="desc"></slot>
        </md-content>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-card'
}
</script>

<style lang="scss" scoped>
.card-personalizado {
  display: flex;
  flex-direction: row;
  height: 100px;
  margin: 10px;

  .md-content {
    width: 200px;
  }
}

.icon-personalizado {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(20, 240, 192);
}
</style>
