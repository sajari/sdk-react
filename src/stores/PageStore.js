import { ChangeEmitter } from '../utils/ChangeEmitter.js'
import AppDispatcher from '../dispatcher/AppDispatcher.js'
import PageConstants from '../constants/PageConstants'

let obj = {}

function get(namespace = 'default') {
    return obj[namespace]
}

function set(namespace = 'default', page) {
    obj = { ...obj, [namespace]: page }
}

function next(namespace = 'default') {
    obj = { ...obj, [namespace]: obj[namespace] + 1}
}

function prev(namespace = 'default') {
    obj = { ...obj, [namespace]: obj[namespace] - 1}
}

class PageStore extends ChangeEmitter {
  get(namespace) {
    return get(namespace);
  }

  set(namespace, page) {
    return set(namespace, page);
  }

  next(namespace) {
    return next(namespace);
  }

  prev(namespace) {
    return prev(namespace);
  }
}

const pageStore = new PageStore()

pageStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action
  const source = payload.source

  if (source == 'PAGE_ACTION') {
    if (action.actionType === PageConstants.SET) {
      pageStore.set(action.namespace, action.page)
      pageStore.emitChange()
      return
    }

    if (action.actionType === PageConstants.NEXT) {
      pageStore.next(action.namespace)
      pageStore.emitChange()
      return
    }

    if (action.actionType === PageConstants.PREV) {
      pageStore.prev(action.namespace)
      pageStore.emitChange()
      return
    }

    console.error("unhandled PAGE_ACTION", payload)
  }

})

export default pageStore
