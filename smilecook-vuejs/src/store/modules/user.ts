import { Module } from 'vuex'

import * as api from '@/api'
import { errorHandler } from '@/request-handler'
import { UserItem } from '@/response'

import { AuthorRecipeListParamsItem } from '../../response'
import { ActionTypes } from '../aciton-types'
import { MutationTypes } from '../mutation-types'

const userStore: Module<any, any> = {
  state: {
    profile: <UserItem>{},
    author: <UserItem>{},
    listParams: <AuthorRecipeListParamsItem>{
      page: 1,
      perPage: 10,
      visibility: 'all'
    }
  },

  // getters:{
  //   profile: (state, getters, rootState) => {
  //     return state.items.map(({ id, quantity }) => {
  //       const product = rootState.products.all.find(product => product.id === id)
  //       return {
  //         title: product.title,
  //         price: product.price,
  //         quantity
  //       }
  //     })
  //   },
  // },

  actions: {
    [ActionTypes.REGISTER]: ({ commit, dispatch, state }, { profile }) => {
      return api.registerUser(profile).then(resp => {
        commit(MutationTypes.SET_ALERT, {
          alert: {
            show: true,
            message:
              'register success! please check your email for active account',
            style: 'alert-success'
          }
        })
        return true
      }, errorHandler)
    },

    [ActionTypes.GET_USER]: ({ commit, dispatch, state }) => {
      commit(MutationTypes.REQUEST_USER)
      return api
        .getMe()
        .then(resp => {
          commit(MutationTypes.SET_USER, { resp })
          return true
        })
        .catch((error) => {
          commit(MutationTypes.REQUEST_USER_ERROR)
          return false
        })
    },

    [ActionTypes.GET_AUTHOR]: ({ commit }, { username }) => {
      return api.getUser(username).then(resp => {
        commit(MutationTypes.SET_AUTHOR, { resp })
      }, errorHandler)
    },

    [ActionTypes.GET_USER_RECIPE_LIST]: (
      { commit },
      { username, page, perPage, visibility }
    ) => {
      return api
        .getUserRecipeList(username, page, perPage, visibility)
        .then(resp => {
          commit(MutationTypes.SET_RECIPE_LIST, { resp })
          commit(MutationTypes.SET_PAGINATION, { resp })
          commit(MutationTypes.SET_AUTHOR_RECIPE_LIST_PARAMS, {
            page,
            perPage,
            visibility
          })
        }, errorHandler)
    },

    [ActionTypes.UPLOAD_AVATAR]: ({ commit }, { file }) => {
      return api.uploadUserAvatar(file).then(resp => {
        commit(MutationTypes.SET_AVATAR, { resp })
      }, errorHandler)
    }
  },

  mutations: {
    [MutationTypes.REQUEST_USER]: state => {
      state.loginStatus = 'request'
    },

    [MutationTypes.SET_USER]: (state, { resp }) => {
      state.loginStatus = 'login'
      state.profile = { ...resp }
    },

    [MutationTypes.REQUEST_USER_ERROR]: state => {
      state.loginStatus = 'error'
      state.profile = <UserItem>{}
    },

    [MutationTypes.CLEAR_USER]: state => {
      state.loginStatus = 'logout'
      state.profile = <UserItem>{}
    },

    [MutationTypes.SET_AUTHOR]: (state, { resp }) => {
      state.author = { ...resp }
    },

    [MutationTypes.SET_AUTHOR_RECIPE_LIST_PARAMS]: (
      state,
      { page, perPage, visibility }
    ) => {
      state.listParams = {
        page,
        perPage,
        visibility
      }
    },

    [MutationTypes.SET_AVATAR]: (state, { resp }) => {
      state.profile.avatar_url = resp.avatar_url || ''
    }
  }
}

export default userStore
