<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-fixed>
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{ $route.meta.title }}</span>
        <div class="md-toolbar-section-end">
          <md-button @click="logout()">Logout</md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>MEU DEPUTADO</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu" v-if="menuVisible">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <router-link :key="index" tag="md-list-item" :to="{ name: item.name }" v-for="(item, index) in routes">
            <md-icon>{{ item.meta.icon }}</md-icon>
            <span class="md-list-item-text">{{ item.meta.title }}</span>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'LayoutMenu',
  computed: {
    routes () {
      return this.$router.options.routes.filter(route => route.meta)
    }
  },
  data () {
    return {
      menuVisible: false
    }
  },
  methods: {
    async logout () {
      await this.$firebase.auth().signOut()
      await sessionStorage.removeItem('uid')
      this.$router.go({ name: 'login' })
    },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);

  .md-content {
    overflow-x: hidden;
  }
}

.md-primary {
  background-color: #086f59 !important;
}

.md-app-content {
  padding: 7px !important;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
