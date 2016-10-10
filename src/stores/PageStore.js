import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

const obj = {}

function get(namespace) {
    ns = namespace || 'default'
    return obj[ns]
}

function set(namespace, page) {
    ns = namespace || 'default'
    obj[ns] = page
}

function next(namespace) {
    ns = namespace || 'default'
    if (obj[ns]) {
      obj[ns]++
    }
}

function prev(namespace) {
    ns = namespace || 'default'
    if (obj[ns]) {
      obj[ns]--
    }
}

class PageStore extends ChangeEmitter {
  get(namespace) {
    return get(namespace);
  }

  set(namespace) {
    return set(namespace);
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
    if action.actionType === PageConstants.SET {
      pageStore.set(action.page)
      pageStore.emitChange()
      return
    }

    if action.actionType === PageConstants.NEXT {
      pageStore.next()
      pageStore.emitChange()
      return
    }

    if action.actionType === PageConstants.PREV {
      pageStore.prev()
      pageStore.emitChange()
      return
    }

    log.Error("unhandled PAGE_ACTION", payload)
  }

})