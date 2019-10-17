import * as localforage from 'localforage'

import { store } from '@/store'

import { ActionTypes } from './store/aciton-types'
import { MutationTypes } from './store/mutation-types'

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'smile_cook',
  storeName: 'auth_data',
  version: 1.0,
  description: ''
})

function authStatusCheck () {
  localforage
    .getItem('_ACCESS_TOKEN')
    .then(accessToken => {
      if (accessToken) {
        store.commit(MutationTypes.SET_TOKEN, {
          token: accessToken,
          status: 'access'
        })
        store.dispatch(ActionTypes.GET_USER).then(() => {
          if (!store.state.isLogin) {
            localforage.removeItem('_ACCESS_TOKEN')
            localforage.removeItem('_REFRESH_TOKEN')
          }
          // localforage.getItem('_REFRESH_TOKEN').then(refreshToken => {
          //   if (!!refreshToken && !store.state.isLogin) {
          //     debugger
          //     store.commit(MutationTypes.SET_TOKEN, {
          //       token: refreshToken,
          //       status: 'refresh'
          //     })
          //     store.dispatch(ActionTypes.GET_USER, { username: 'me' }).then(()=> {
          //       throw Error('')
          //     })
          //   }
          // })
        })
      }
    })
    .catch(error => {
      localforage.removeItem('_ACCESS_TOKEN')
      localforage.removeItem('_REFRESH_TOKEN')
    })
}

export { authStatusCheck, localforage }
