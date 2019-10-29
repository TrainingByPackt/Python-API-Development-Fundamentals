import Vue from 'vue'
import Vuex from 'vuex'

import * as api from '@/api'
import { localforage } from '@/auth'
import { errorHandler } from '@/request-handler'
import { AlertItem, DialogItem, RouteMapItem, TokenDataItem } from '@/response'

import { ActionTypes } from './aciton-types'
import recipeStore from './modules/recipe'
import userStore from './modules/user'
import { MutationTypes } from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    routeMap: <RouteMapItem>{
      to: { name: 'home', params: {} },
      from: { name: 'home', params: {} }
    },
    tokenData: <TokenDataItem>{
      token: '',
      status: ''
    },
    alert: <AlertItem>{
      show: false,
      message: '',
      style: ''
    },
    dialog: <DialogItem>{
      show: false,
      title: '',
      msg: '',
      hasConfirmButton: false,
      hasCancelButton: false,
      callback: () => {
      }
    }
  },

  getters: {
    // hasLogin: (state, getters) => {
    //   return state.isLogin
    // }
  },

  actions: {
    [ActionTypes.CURRENT_ROUTE]: (
      { commit, dispatch, state },
      { routeMap }
    ) => {
      commit(MutationTypes.SET_ROUTE_MAP, { routeMap })
    },

    [ActionTypes.OPEN_ALERT]: ({ commit }, { alert }) => {
      commit(MutationTypes.SET_ALERT, { alert })
    },

    [ActionTypes.CLOSE_ALERT]: ({ commit }) => {
      commit(MutationTypes.RESET_ALERT)
    },

    [ActionTypes.OPEN_DIALOG]: ({ commit }, { dialog }) => {
      commit(MutationTypes.SET_DIALOG, dialog)
    },

    [ActionTypes.CLOSE_DIALOG]: ({ commit }) => {
      commit(MutationTypes.CLEAR_DIALOG)
    },

    [ActionTypes.LOGIN]: ({ commit, dispatch }, { account }) => {
      return new Promise((resolve, reject) => {
        commit(MutationTypes.REQUEST_TOKEN)
        api.loginUser(account).then(resp => {
          localforage.setItem('_ACCESS_TOKEN', resp.access_token)
          localforage.setItem('_REFRESH_TOKEN', resp.refresh_token)

          commit(MutationTypes.SET_TOKEN, {
            token: resp.access_token,
            status: 'access'
          })
          commit(MutationTypes.SET_LOGIN_STATUS, true)
          dispatch(ActionTypes.GET_USER)

          resolve(resp)
        }, errorHandler)
      })
    },

    [ActionTypes.LOGOUT]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        api
        .logoutUser()
        .then(resp => {
          commit(MutationTypes.CLEAR_USER)
          commit(MutationTypes.CLEAR_TOKEN)
          commit(MutationTypes.SET_LOGIN_STATUS, false)
          commit(MutationTypes.SET_ALERT, { 
            alert: {
              show: true,
              message: resp.message,
              style: 'alert-success'
            } 
          })
  
          localforage.removeItem('_ACCESS_TOKEN')
          localforage.removeItem('_REFRESH_TOKEN')

          resolve(resp)
        })
        .catch(error => {
          commit(MutationTypes.CLEAR_USER)
          commit(MutationTypes.CLEAR_TOKEN)
          commit(MutationTypes.SET_LOGIN_STATUS, false)
  
          localforage.removeItem('_ACCESS_TOKEN')
          localforage.removeItem('_REFRESH_TOKEN')

          resolve(error)
        })
      })
    },

    [ActionTypes.DEREGISTER_USER]: ({ commit }) => {
      commit(MutationTypes.CLEAR_USER)
      commit(MutationTypes.CLEAR_TOKEN)
      commit(MutationTypes.SET_LOGIN_STATUS, false)

      localforage.removeItem('_ACCESS_TOKEN')
      localforage.removeItem('_REFRESH_TOKEN')
    }
  },

  mutations: {
    [MutationTypes.SET_ROUTE_MAP]: (state, { routeMap }) => {
      state.routeMap = routeMap
    },

    [MutationTypes.SET_ALERT]: (state, { alert }) => {
      state.alert = alert
    },

    [MutationTypes.RESET_ALERT]: state => {
      state.alert = <AlertItem>{
        show: false,
        message: '',
        style: 'alert-light'
      }
    },

    [MutationTypes.SET_DIALOG]: (state, dialog) => {
      state.dialog = dialog
    },

    [MutationTypes.CLEAR_DIALOG]: state => {
      state.dialog = {
        show: false,
        title: '',
        msg: '',
        hasConfirmButton: false,
        hasCancelButton: false,
        callback: () => {
        }
      }
    },

    // token
    [MutationTypes.REQUEST_TOKEN]: state => {
      state.tokenData.status = 'request'
    },

    // token
    [MutationTypes.SET_TOKEN]: (state, { token, status }) => {
      state.tokenData = {
        token: token,
        status: status
      }
    },

    // token
    [MutationTypes.REQUEST_TOKEN_ERROR]: state => {
      state.tokenData.status = 'error'
      state.tokenData.hasRequestOnce = true
    },

    // token
    [MutationTypes.CLEAR_TOKEN]: state => {
      state.tokenData = <TokenDataItem>{}
    },

    // login status
    [MutationTypes.SET_LOGIN_STATUS]: (state, loginStatus) => {
      state.isLogin = loginStatus
    }
  },

  modules: {
    recipeStore: recipeStore,
    userStore: userStore
  }
})

export { store }

export default store
