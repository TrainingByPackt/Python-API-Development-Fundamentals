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

function authStatusCheck (callback: (authCheck: boolean) => void) {
  localforage
    .getItem('_ACCESS_TOKEN')
    .then((accessToken) => {
      if (!!accessToken) {
        store.commit(MutationTypes.SET_TOKEN, {
          token: accessToken,
          status: 'access'
        })
        store.dispatch(ActionTypes.GET_USER).then((resp) => {
          if (!resp) {
            clearForage()
            store.commit(MutationTypes.SET_LOGIN_STATUS, false)
            callback(false)
          } else {
            store.commit(MutationTypes.SET_LOGIN_STATUS, true)
            callback(true)
          }
        })
      } else {
        store.commit(MutationTypes.SET_LOGIN_STATUS, false)
        callback(false)
      }
    })
    .catch(() => {
      clearForage()
      store.commit(MutationTypes.SET_LOGIN_STATUS, false)
      callback(false)
    })
}

function clearForage () {
  localforage.removeItem('_ACCESS_TOKEN')
  localforage.removeItem('_REFRESH_TOKEN')
}

export { authStatusCheck, localforage }
