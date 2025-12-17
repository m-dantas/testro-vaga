<template>
  <div id="app">
    <div class="content-view" v-if="showNavBar">
      <layout-menu>
        <router-view />
      </layout-menu>
    </div>
    <div class="content-view" v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import LayoutMenu from './components/layout/LayoutMenu'
export default {
  components: {
    LayoutMenu
  },
  computed: {
    showNavBar () {
      let res = ''
      if (this.$route.name !== 'login' && sessionStorage.getItem('uid')) {
        res = true
      } else {
        res = false
      }
      return res
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');

body {
  margin: 0;
  padding: 0;
}

#app {
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
}

.content-view {
  margin: 0;
  width: 100%;
  height: 100vh;
}
</style>
