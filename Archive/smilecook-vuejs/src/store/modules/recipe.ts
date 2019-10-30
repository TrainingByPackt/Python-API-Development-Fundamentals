import { Module } from 'vuex'

import * as api from '@/api'
import { errorHandler } from '@/request-handler'
import { RecipeListItem, RecipeListParamsItem } from '@/response'
import { ActionTypes } from '@/store/aciton-types'

import { PaginationItem, RecipeItem } from '../../response'
import { MutationTypes } from '../mutation-types'

const recipeStore: Module<any, any> = {
  state: {
    listParams: <RecipeListParamsItem>{
      q: '',
      page: 1,
      perPage: 10,
      sort: 'created_at',
      order: 'desc'
    },
    pagination: <PaginationItem>{
      links: {}
    },
    recipeList: <Array<RecipeListItem>>[],
    recipeDetail: <RecipeItem>{
      author: {}
    },
    previous: {
      path: '',
      query: {}
    }
  },

  actions: {
    [ActionTypes.GET_RECIPE_LIST]: (
      { commit },
      { q, page, perPage, sort, order }
    ) => {
      return api.getRecipeList(q, page, perPage, sort, order).then(resp => {
        commit(MutationTypes.SET_RECIPE_LIST, { resp })
        commit(MutationTypes.SET_PAGINATION, { resp })
        commit(MutationTypes.SET_RECIPE_LIST_PARAMS, {
          q,
          page,
          perPage,
          sort,
          order
        })
      }, errorHandler)
    },

    [ActionTypes.GET_RECIPE]: ({ commit }, { recipeId }) => {
      return api.getRecipe(recipeId).then(resp => {
        commit(MutationTypes.SET_RECIPE_DETAIL, { resp })
      }, errorHandler)
    },

    [ActionTypes.CREATE_RECIPE]: ({ commit }, { recipe }) => {
      return api.createRecipe(recipe).then(resp => {
        commit(MutationTypes.SET_RECIPE_DETAIL, { resp })
        return resp.id
      }, errorHandler)
    },

    [ActionTypes.UPDATE_RECIPE]: ({ commit }, { recipe }) => {
      return api.updateRecipe(recipe).then(resp => {
        commit(MutationTypes.SET_RECIPE_DETAIL, { resp })
      }, errorHandler)
    },

    [ActionTypes.DELETE_RECIPE]: ({ commit }, { recipeId }) => {
      return api.deleteRecipe(recipeId).then(resp => {
        commit(MutationTypes.SET_RECIPE_DETAIL, { resp: <RecipeItem>{
          author: {}
        }})
      }, errorHandler)
    },

    [ActionTypes.RESET_RECIPE]: ({ commit }) => {
      commit(MutationTypes.SET_RECIPE_DETAIL, { resp: <RecipeItem>{
        author: {}
      }})
    },

    [ActionTypes.PUBLISH_RECIPE]: ({ commit }, { recipeId }) => {
      return api.publishRecipe(recipeId).then(resp => {
        commit(MutationTypes.SET_RECIPE_PUBLISH_STATUS, true)
      }, errorHandler)
    },

    [ActionTypes.UNPUBLISH_RECIPE]: ({ commit }, { recipeId }) => {
      return api.unpublishRecipe(recipeId).then(resp => {
        commit(MutationTypes.SET_RECIPE_PUBLISH_STATUS, false)
      }, errorHandler)
    },

    [ActionTypes.UPLOAD_COVER]: ({ commit }, { recipeId, file }) => {
      return api.uploadRecipeCover(recipeId, file).then(resp => {
        if (!!resp) {
          commit(MutationTypes.SET_RECIPE_COVER, { resp })
          return true
        } else {
          return false
        }
      }, errorHandler)
    },

    [ActionTypes.UPDATE_PREVIOUS]: ({ commit }, { path, query }) => {
        commit(MutationTypes.SET_PREVIOUS, { path, query })
    }
  },

  mutations: {
    [MutationTypes.SET_RECIPE_LIST]: (state, { resp }) => {
      state.recipeList = resp.data
    },

    [MutationTypes.SET_PAGINATION]: (state, { resp }) => {
      state.pagination = resp
    },

    [MutationTypes.SET_RECIPE_LIST_PARAMS]: (
      state,
      { q, page, perPage, sort, order }
    ) => {
      state.listParams = {
        q,
        page,
        perPage,
        sort,
        order
      }
    },

    [MutationTypes.SET_RECIPE_DETAIL]: (state, { resp }) => {
      state.recipeDetail = resp
    },

    [MutationTypes.SET_RECIPE_PUBLISH_STATUS]: (state, isPublish) => {
      state.recipeDetail.is_publish = isPublish
    },

    [MutationTypes.SET_RECIPE_COVER]: (state, { resp }) => {
      state.recipeDetail.cover_url = resp.cover_url
    },

    [MutationTypes.SET_PREVIOUS]: (state, { path, query }) => {
      state.previous = {path: path, query: query}
    }
  }
}

export default recipeStore
