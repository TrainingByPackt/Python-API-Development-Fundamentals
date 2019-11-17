import axios, { AxiosResponse } from 'axios'

import {
    AvatarItem, CoverItem, MessageItem, RecipeItem, RecipeListItem, RecipeListPaginationItem,
    RefreshItem, TokenItem, UserItem
} from '@/response'
import store from '@/store'

import { APIHost } from '@/utils'

var API_HOST = APIHost()

const userListAPI = `${API_HOST}users`
const userAPI = `${API_HOST}users/{username}`
const userAvatarAPI = `${API_HOST}users/avatar`
const userRecipesListAPI = `${API_HOST}users/{username}/recipes`

const meAPI = `${API_HOST}me`

const tokenAPI = `${API_HOST}token`
const refreshAPI = `${API_HOST}refresh`
const revokeAPI = `${API_HOST}revoke`

const recipeListAPI = `${API_HOST}recipes`
const recipeAPI = `${API_HOST}recipes/{recipeId}`
const recipePublishAPI = `${API_HOST}recipes/{recipeId}/publish`
const recipeCoverUploadAPI = `${API_HOST}recipes/{recipeId}/cover`

function authorizationOption (): Object {
  // if (Object.keys(store.state.header).length !== 0) {
  if (store.state.tokenData.token) {
    return {
      Authorization: `Bearer ${store.state.tokenData.token}`
    }
  } else {
    return {}
  }
}

function registerUser (profile: object): Promise<AxiosResponse> {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(userListAPI, {
        ...profile
      })
      .then(function (response: AxiosResponse) {
        if (response.status === 201) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function loginUser (account: object): Promise<TokenItem> {
  return new Promise<TokenItem>((resolve, reject) => {
    axios
      .post(tokenAPI, {
        ...account
      })
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function reLoginUser (): Promise<RefreshItem> {
  return new Promise<RefreshItem>((resolve, reject) => {
    axios
      .post(refreshAPI, {})
      .then(function (response: any) {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject()
        }
      })
      .catch(error => {
        reject()
      })
  })
}

function getMe (): Promise<UserItem> {
  return new Promise<UserItem>((resolve, reject) => {
    axios
      .get(meAPI, {
        headers: {
          ...authorizationOption()
        }
      })
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function getUser (username: string): Promise<UserItem> {
  return new Promise<UserItem>((resolve, reject) => {
    axios
      .get(userAPI.replace('{username}', username), {
        headers: {
          ...authorizationOption()
        }
      })
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function uploadUserAvatar (file: File): Promise<AvatarItem> {
  return new Promise<AvatarItem>((resolve, reject) => {
    var data = new FormData()
    data.append('avatar', file)

    axios
      .put(userAvatarAPI, data, {
        headers: {
          ...authorizationOption()
        }
      })
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function getUserRecipeList (
  username: string,
  page: number,
  perPage: number,
  visibility: string
): Promise<RecipeListPaginationItem> {
  return new Promise<RecipeListPaginationItem>((resolve, reject) => {
    axios
      .get(userRecipesListAPI.replace('{username}', username), {
        params: {
          page: page,
          per_page: perPage,
          visibility: visibility
        },
        headers: {
          ...authorizationOption()
        }
      })
      .then(function (response: AxiosResponse) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function logoutUser (): Promise<MessageItem> {
  return new Promise<MessageItem>((resolve, reject) => {
    axios
      .post(revokeAPI,
        {},
        {
          headers: {
            ...authorizationOption(),
          },
        }
      )
      .then(function (response: AxiosResponse) {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.reponse)
      })
  })
}

function getRecipeList (
  q: number,
  page: number,
  perPage: number,
  sort: string,
  order: string
): Promise<RecipeListPaginationItem> {
  return new Promise<RecipeListPaginationItem>((resolve, reject) => {
    axios
      .get(recipeListAPI, {
        params: {
          q: q,
          page: page,
          per_page: perPage,
          sort: sort,
          order: order
        },
        headers: {
          ...authorizationOption()
        }
      })
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function createRecipe (recipe: RecipeItem): Promise<RecipeItem> {
  return new Promise<RecipeItem>((resolve, reject) => {
    axios
      .post(
        recipeListAPI,
        { ...recipe },
        {
          headers: {
            ...authorizationOption()
          }
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function updateRecipe (recipe: RecipeItem): Promise<RecipeListItem> {
  return new Promise<RecipeListItem>((resolve, reject) => {
    axios
      .patch(
        recipeAPI.replace('{recipeId}', String(recipe.id)),
        { ...recipe },
        {
          headers: {
            ...authorizationOption()
          }
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function deleteRecipe (recipeId: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .delete(recipeAPI.replace('{recipeId}', recipeId), {
        headers: {
          ...authorizationOption()
        }
      })
      .then((response: any) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function publishRecipe (recipeId: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .put(
        recipePublishAPI.replace('{recipeId}', recipeId),
        {},
        {
          headers: {
            ...authorizationOption()
          }
        }
      )
      .then((response: any) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function unpublishRecipe (recipeId: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .delete(recipePublishAPI.replace('{recipeId}', recipeId), {
        headers: {
          ...authorizationOption()
        }
      })
      .then((response: any) => {
        if (response.status === 204) {
          resolve()
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function uploadRecipeCover (recipeId: string, file: File): Promise<CoverItem> {
  return new Promise<CoverItem>((resolve, reject) => {
    var data = new FormData()
    data.append('cover', file)
    axios
      .put(recipeCoverUploadAPI.replace('{recipeId}', recipeId), data, {
        headers: {
          ...authorizationOption()
        }
      })
      .then((response: any) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

function getRecipe (recipeId: number): Promise<RecipeItem> {
  return new Promise<RecipeItem>((resolve, reject) => {
    axios
      .get(recipeAPI.replace('{recipeId}', String(recipeId)), {
        headers: {
          ...authorizationOption()
        }
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

export {
  registerUser,
  loginUser,
  reLoginUser,
  logoutUser,
  getMe,
  getUser,
  uploadUserAvatar,
  getUserRecipeList,
  getRecipeList,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  publishRecipe,
  unpublishRecipe,
  uploadRecipeCover
}
