import React from 'react'

import { RegisterNamespace, Fields } from 'sajari-react/api-components'

const Sajari = () => (
  <div>
    <RegisterNamespace project='sajariptyltd' collection='sajari-com'/>
    <Fields fields={['_id', 'title', 'description', 'url']}/>
  </div>
)

export default Sajari
