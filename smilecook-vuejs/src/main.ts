import { DropdownPlugin } from 'bootstrap-vue'
import moment from 'moment'
import Vue from 'vue'
import VueHead from 'vue-head'

import store from '@/store'

import App from './App.vue'
import { router } from './router'

Vue.config.productionTip = false

Vue.use(VueHead)
Vue.use(DropdownPlugin)

Vue.filter('formatDate', function(value: string) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
  return ''
})

const app = new Vue({
  router: router,
  store: store,

  head: {
    title: {
      inner: 'Smilecook'
    },

    link: [
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
      }
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://kit.fontawesome.com/4ae37ebd2b.js'
      }
    ]
  },

  data: {},

  methods: {},

  watch: {},

  render: h => h(App)
}).$mount('#app')
