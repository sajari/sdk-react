import React from 'react'
import './App.css'

import { RegisterNamespace, ResultInjector } from 'sajari-react/api-components'
import { BodyInput } from 'sajari-react/ui-components'

import ResultRenderer from './ResultRenderer'

const project = ''
const collection = ''

const App = () => (
  <div className="app">
    <RegisterNamespace project={project} collection={collection} />
    <div className="header">
      <h2>Sajari Search</h2>
      <BodyInput placeholder='Enter search query' />
    </div>
    <ResultInjector>
      <ResultRenderer />
    </ResultInjector>
  </div>
)

export default App
