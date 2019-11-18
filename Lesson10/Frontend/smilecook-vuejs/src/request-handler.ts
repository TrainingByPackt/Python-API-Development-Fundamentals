import { AxiosResponse } from 'axios'
import HttpStatus from 'http-status-codes'

import { router } from '@/router'
import store from '@/store'
import { ActionTypes } from '@/store/aciton-types'

const errorHandler = (response: AxiosResponse | boolean): any => {
  if (typeof response === 'boolean') {
    router.replace({ name: 'internal-server-error' })
  } else {
    switch (response.status) {
      case HttpStatus.BAD_REQUEST:
        if (response.data.message !== undefined) {
          store.dispatch(ActionTypes.OPEN_ALERT, {
            alert: {
              show: true,
              message: response.data.message,
              style: 'alert-warning'
            }
          })
          break
        } else {
          response.status = HttpStatus.INTERNAL_SERVER_ERROR
        }

      case HttpStatus.UNAUTHORIZED:
        if (store.state.routeMap.to.name === 'login' && !!response.data.message) {
          store.dispatch(ActionTypes.OPEN_ALERT, {
            alert: {
              show: true,
              message: response.data.message,
              style: 'alert-danger'
            }
          })
        } else {
          try {
            if (
              (<any> router).history.current.meta.requiresAuth ||
              (!!response.data && response.data.message === 'Token has expired')
            ) {
              store.dispatch(ActionTypes.OPEN_ALERT, {
                alert: {
                  show: true,
                  message:
                    'Your session has been expired, require login again.',
                  style: 'alert-danger'
                }
              })
              store.dispatch(ActionTypes.DEREGISTER_USER).then(() => {
                router.push({ name: 'login' })
              })
            } else {
              store.dispatch(ActionTypes.DEREGISTER_USER).then(() => {
                // console.log(router)
                router.go((<any>router).history.current.path)
              })
            }
          } catch (error) {
            router.replace({ name: 'not-found' })
          }
        }
        break

      case HttpStatus.FORBIDDEN:
        if (store.state.routeMap.to.name === 'login' && !!response.data.message) {
          store.dispatch(ActionTypes.OPEN_ALERT, {
            alert: {
              show: true,
              message: response.data.message,
              style: 'alert-danger'
            }
          })
        } else {
          router.replace({ name: 'not-found' })
        }
        break

      case HttpStatus.NOT_FOUND:
        router.replace({ name: 'not-found' })
        break

      case HttpStatus.UNPROCESSABLE_ENTITY:
        router.replace({ name: 'home' })
        break

      case HttpStatus.TOO_MANY_REQUESTS:
        store.dispatch(ActionTypes.OPEN_ALERT, {
          alert: {
            show: true,
            message:
              'Server in the loading, please try again later.',
            style: 'alert-danger'
          }
        })
        break
        // too many request

      case HttpStatus.INTERNAL_SERVER_ERROR:
        router.replace({ name: 'internal-server-error' })
        break

      default:
        router.replace('/')
        break
    }
  }
  return false
}

export { errorHandler }
