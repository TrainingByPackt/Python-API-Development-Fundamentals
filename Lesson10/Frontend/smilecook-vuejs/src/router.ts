import Vue from 'vue'
import Router from 'vue-router'

import { store } from '@/store'
import { ActionTypes } from '@/store/aciton-types'
import LoginView from '@/views/account/login-view.vue'
import RegisterView from '@/views/account/register-view.vue'
import MyRecipeListView from '@/views/author/my-recipe-list-view.vue'
import RecipePanelView from '@/views/author/recipe-panel-view.vue'
import InternalServerErrorView from '@/views/general/internal-server-error-view.vue'
import NotFoundView from '@/views/general/not-found-view.vue'
import Home from '@/views/home.vue'
import AuthorView from '@/views/recipe/author-recipe-list-view.vue'
import RecipeDetailView from '@/views/recipe/recipe-detail-view.vue'
import RecipeListView from '@/views/recipe/recipe-list-view.vue'

import { authStatusCheck } from './auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'recipe-list',
      component: RecipeListView
    },
    {
      path: '/create-recipe',
      name: 'create-recipe',
      component: RecipePanelView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-recipe/:recipeId',
      name: 'edit-recipe',
      component: RecipePanelView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes/:recipeId',
      name: 'recipe-detail',
      component: RecipeDetailView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/my-recipes',
      name: 'my-recipes',
      component: MyRecipeListView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/author/:username',
      name: 'author',
      component: AuthorView
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/internal-server-error',
      name: 'internal-server-error',
      component: InternalServerErrorView
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch(ActionTypes.CURRENT_ROUTE, {
    routeMap: { to: to, from: from }
  })

  if (to.matched.some(record => record.meta.requiresAuth)) {
    authStatusCheck((authCheck) => {
      if (authCheck) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    authStatusCheck((authCheck) => {})
    next()
  }
})

export { router }
