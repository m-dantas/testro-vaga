<template>
  <md-card md-with-hover>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">
          {{ title }}
        </div>
        <div class="md-subhead">
          {{ subtitle }}
        </div>
      </md-card-header-text>
      <md-card-media>
        <img :src="this.srcImage" />
      </md-card-media>
    </md-card-header>
    <md-card-actions>
      <md-button class="md-raised" @click="openDetailsDeputado(id_deputado)">
        VER MAIS
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'layoutcarddeputado',
  props: {
    id_deputado: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    srcImage: {
      type: String,
      required: true
    }
  },
  methods: {
    openDetailsDeputado (id) {
      this.$router.push({ name: 'details-deputado', params: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-card-media {
  height: auto;
}

.md-ripple {
  margin-bottom: 5px;
}

.md-button {
  background-color: #086f59 !important;
  color: #ffffff !important;
}
</style>
