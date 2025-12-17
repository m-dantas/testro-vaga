<template>
  <div id="cadastrar">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-large-size-30 md-medium-size-70 md-small-size-90 md-xsmall-size-90">
        <md-card>
          <md-card-header>
            <div class="md-title">Cadastre-se</div>
            <h3 v-if="hasMessages">{{ this.messageError }}</h3>
          </md-card-header>
          <form @submit.prevent="doSignUp">
            <md-card-content>
              <md-field>
                <label>E-mail</label>
                <md-input v-model="form.email" type="email" required></md-input>
              </md-field>
              <md-field>
                <label>Senha</label>
                <md-input v-model="form.password" type="password" required></md-input>
              </md-field>
              <md-field>
                <label>Confirme a Senha</label>
                <md-input v-model="form.repassword" type="password" required></md-input>
              </md-field>
            </md-card-content>
            <md-card-actions>
              <md-button type="button" class="md-primary" @click="pushFrameLogin">VOLTAR PARA TELA DE LOGIN</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">Cadastrar-se</md-button>
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
  name: 'cadastrar',
  data: () => ({
    hasMessages: false,
    sending: false,
    messageError: null,
    form: {
      email: null,
      password: null,
      repassword: null
    }
  }),
  mounted () {
    document.title = 'Cadastrar-se'
  },
  methods: {
    clearInputs () {
      this.form.email = null
      this.form.password = null
      this.form.repassword = null
      this.sending = false
    },
    pushFrameLogin () {
      this.$router.push({ name: 'login' })
    },
    async doSignUp () {
      const { email, password, repassword } = this.form
      try {
        this.sending = true
        if (password !== repassword) {
          this.hasMessages = true
          this.messageError = 'Senhas digitadas não coincidem, digite novamente.'
          this.clearInputs()
        } else {
          const res = await this.$firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
          this.$router.push({ name: 'dashboard' })
        }
      } catch (error) {
        console.log(error)
        switch (error.code) {
          case 'auth/email-already-in-use':
            setTimeout(() => {
              this.messageError = 'E-mail já cadastrado.'
              this.hasMessages = true
              this.clearInputs()
            }, 500)
            break
          case 'auth/weak-password':
            setTimeout(() => {
              this.messageError = 'A senha deve possuir pelo menos 6 caracteres.'
              this.hasMessages = true
              this.clearInputs()
            }, 500)
            break
          default:
            setTimeout(() => {
              this.messageError = 'Ocorreu algum erro ao se cadastrar, tente mais tarde.'
              this.hasMessages = true
              this.clearInputs()
            }, 500)
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#cadastrar {
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
