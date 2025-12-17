<template>
  <div id="login">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-large-size-30 md-medium-size-70 md-small-size-90 md-xsmall-size-90">
        <md-card>
          <md-card-header>
            <div class="md-title">Login</div>
            <h3 v-if="messageError">Usuário ou senha incorretos, tente novamente.</h3>
          </md-card-header>
          <form @submit.prevent="doLogin">
            <md-card-content>
              <md-field>
                <label>E-mail</label>
                <md-input v-model="form.email" type="email" required></md-input>
              </md-field>
              <md-field :class="messageClass">
                <label>Senha</label>
                <md-input v-model="form.password" type="password" required></md-input>
              </md-field>
            </md-card-content>
            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending">ENTRAR</md-button>
            </md-card-actions>
          </form>
          <md-card-content align="center">
            Esqueceu sua senha? <a href="/recuperar">Redefinir senha.</a>
            <br>
            Não é registrado? <a href="/cadastrar">Cadastrar-se.</a>
          </md-card-content>
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
  name: 'login',
  data: () => ({
    hasMessages: false,
    sending: false,
    messageError: false,
    form: {
      email: null,
      password: null
    }
  }),
  computed: {
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    }
  },
  mounted () {
    document.title = 'Login'
  },
  methods: {
    clearInputs () {
      this.form.email = null
      this.form.password = null
      this.sending = false
    },
    async doLogin () {
      const { email, password } = this.form
      try {
        this.sending = true
        console.log(this.$firebase)
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
        sessionStorage.setItem('uid', res.user.uid)
        setTimeout(() => {
          this.$router.push({ name: 'dashboard' })
        }, 500)
      } catch (error) {
        setTimeout(() => {
          this.messageError = true
          this.clearInputs()
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
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
