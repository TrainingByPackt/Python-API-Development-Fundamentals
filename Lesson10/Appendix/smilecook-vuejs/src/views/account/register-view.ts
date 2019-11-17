import { Component, Vue } from 'vue-property-decorator'

import { router } from '@/router'
import { validEmail } from '@/validation'

export interface registerItem {
  username: string
  email: string
  password: string
}

@Component
export default class RegisterView extends Vue {
  inputItem = <registerItem>{}
  confirmPassword: string = ''

  usernameValidated = true
  emailValidated = true
  passwordValidated = true
  confirmPasswordValidated = true

  formCheck () {
    if (
      !!this.inputItem.password &&
      this.inputItem.password === this.confirmPassword &&
      !!this.inputItem.username &&
      !!this.inputItem.email &&
      validEmail(this.inputItem.email)
    ) {
      return this.submitRegister()
    }
    this.usernameValidated = !!this.inputItem.username

    this.emailValidated =
      !!this.inputItem.email && validEmail(this.inputItem.email)

    this.passwordValidated = !!this.inputItem.password

    this.confirmPasswordValidated =
      !!this.confirmPassword && this.inputItem.password === this.confirmPassword
  }

  submitRegister () {
    this.$store
      .dispatch('REGISTER', { profile: this.inputItem })
      .then(result => {
        if (result) {
          router.replace({ name: 'home' })
        }
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
