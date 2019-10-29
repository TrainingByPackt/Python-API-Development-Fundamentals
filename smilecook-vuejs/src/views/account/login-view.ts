import { Component, Vue, Watch } from 'vue-property-decorator'

import { ActionTypes } from '@/store/aciton-types'
import { validEmail } from '@/validation'

export interface loginItem {
  email: string
  password: string
}

@Component
export default class LoginView extends Vue {
  inputItem = <loginItem>{}
  showValidated = false
  emailValidated = true
  passwordValidated = true
  checkLoginStatus = false

  get loginStatus () : boolean{
    return this.$store.state.isLogin
  }

  @Watch('loginStatus')
  change () {
    this.checkLoginStatus = this.loginStatus
  }

  formCheck () {
    this.emailValidated =
      !!this.inputItem.email && validEmail(this.inputItem.email)
    this.passwordValidated = !!this.inputItem.password

    if (this.emailValidated && this.passwordValidated) {
      this.submitLogin()
    }
  }

  submitLogin () {
    this.$store
      .dispatch(ActionTypes.LOGIN, { account: this.inputItem })
      .then(success => {
        this.$router.push({name: 'home'})
      })
  }

  beforeMount () {
    setTimeout(() => {
      if (!! this.$store.state.isLogin) {
        this.$router.push({
          name: 'home'
        })
      }
    }, 1000)
  }
}
