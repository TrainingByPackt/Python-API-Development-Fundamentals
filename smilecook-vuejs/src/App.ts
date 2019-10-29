import { Component, Vue, Watch } from 'vue-property-decorator'

import AlertComponent from '@/components/AlertComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import ProfileComponent from '@/components/ProfileComponent.vue'
import { AlertItem } from '@/response'
import { ActionTypes } from '@/store/aciton-types'

@Component({
  components: {
    ProfileComponent,
    AlertComponent,
    DialogComponent
  }
})
export default class AppView extends Vue {
  showCollapse = false

  username: string = ''
  email: string = ''
  createdAt: string = ''
  imageUrl: string = ''

  get alert (): AlertItem {
    if ((<any> this.$store.state).alert.show === true) {
      setTimeout(() => {
        this.closeAlert()
      }, 5000)
    }
    return (<any> this.$store.state).alert
  }

  get isLogin () {
    try {
      return (<any> this.$store.state).isLogin
    } catch (error) {
      return false
    }
  }

  closeAlert () {
    this.$store.dispatch(ActionTypes.CLOSE_ALERT)
  }

  @Watch('$route')
  routeChange (newVal: any, oldVal: any) {
    // this.checkLogin();
  }

  switchCollapse () {
    this.showCollapse = !this.showCollapse
  }

  beforeMount () {}
}
