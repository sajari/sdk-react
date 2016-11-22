import React from 'react'

import { RegisterNamespace, Fields, ClickTokens } from '../../api-components'

/*
 * Config is a wrapper for basic web-based config components.
 */
const Config = ({ namespace, project, collection, fields, trackingField }) => (
  <div>
    <RegisterNamespace namespace={namespace} project={project} collection={collection} />
    <Fields namespace={namespace} fields={fields} />
    <ClickTokens namespace={namespace} field={trackingField} />
  </div>
)

Config.propTypes = {
  project: React.PropTypes.string.isRequired,
  collection: React.PropTypes.string.isRequired,
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  fields: React.PropTypes.arrayOf(React.PropTypes.string),
  trackingField: React.PropTypes.string
}

Config.defaultProps = {
  namespace: 'default',
  fields: ['_id', 'title', 'description', 'url', 'boost'],
  trackingField: 'url'
}

export default Config
