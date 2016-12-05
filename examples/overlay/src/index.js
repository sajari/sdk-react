import React from 'react'
import ReactDOM from 'react-dom'

import 'sajari-react/ui/Overlay.css'
import 'sajari-react/ui/Search.css'
// import './index.css'

import { Provider } from 'react-redux'

import { DefaultOverlay } from 'sajari-react/ui/Overlay'
import { setActive } from 'sajari-react/ui/actions/Overlay'
import Config from 'sajari-react/ui/Config'

import makeDefaultStore from './store'


const store = makeDefaultStore()

store.dispatch(setActive(true))

const App = () => (
  <div>
    <Config
      namespace='default'
      project='sajariptyltd'
      collection='sajari-com'
    />
    <DefaultOverlay
      tabs={[]}
      logoUrl='https://www.sajari.com/img/sajari-100x100-flat.png'
      prefixBoosts={{
        'title': 0.05
      }}
      containsBoosts={{
        'title': 0.03
      }}
    />
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
