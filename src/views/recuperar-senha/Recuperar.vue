<template>
  <div id="recuperar">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-large-size-30 md-medium-size-70 md-small-size-90 md-xsmall-size-90">
        <md-card>
          <md-card-header>
            <div class="md-title">Redefinir senha</div>
            <h3 v-if="hasMessages">{{ this.messageError }}</h3>
            <h3 v-if="success" class="success">E-mail de recupeção de senha enviado com sucesso, verifique a caixa de
              spam.</h3>
          </md-card-header>
          <form @submit.prevent="doForgetPass">
            <md-card-content>
              <md-field>
                <label>E-mail</label>
                <md-input v-model="form.email" type="email" required></md-input>
              </md-field>
            </md-card-content>
            <md-card-actions>
              <md-button type="button" class="md-primary" @click="pushFrameLogin">VOLTAR PARA TELA DE LOGIN</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">Enviar</md-button>
            </md-card-actions>
          </form>
          <md-progress-bar md-mode="indeterminate" v-if="sending"></md-progress-bar>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { setTimeout } from 'timers'
export default {
  name: 'recuperar',
  data: () => ({
    hasMessages: false,
    sending: false,
    success: false,
    messageError: null,
    form: {
      email: null
    }
  }),
  mounted () {
    document.title = 'Recuperar Acesso'
  },
  methods: {
    clearInputs () {
      this.form.email = null
      this.sending = false
    },
    pushFrameLogin () {
      this.$router.push({ name: 'login' })
    },
    async doForgetPass () {
      const { email } = this.form
      try {
        this.sending = true
        const res = await this.$firebase
          .auth()
          .sendPasswordResetEmail(email)
        if (res == null) {
          this.success = true
          this.sending = false
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 3000)
        }
        // this.$router.push({ name: 'dashboard' })
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            setTimeout(() => {
              this.messageError = 'E-mail não cadastrado, verifique o e-mail digitado, caso persista entre em contato com o Administrador.'
              this.hasMessages = true
              this.clearInputs()
            }, 500)
            break
          default:
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#recuperar {
  width: 100%;
  height: 100vh;
  background-image: url('https://www.conferencecompass.com/wp-content/uploads/2018/09/diagonal-pattern-background-01.png');
  background-size: cover;
}

.md-layout {
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
}
</style>
