import { Component, Vue } from 'vue-property-decorator'

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
        this.$router.push({
          name: this.$store.state.routeMap.from.name || 'home',
          params: this.$store.state.routeMap.from.params
        })
      })
  }

  beforeMount () {
    if (!! this.$store.state.isLogin) {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
