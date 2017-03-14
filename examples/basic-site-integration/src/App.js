import React from 'react'
import { connect } from 'react-redux'

import Pipeline from 'sajari-react/pipeline/Pipeline'
import Value from 'sajari-react/pipeline/Value'
import Response from 'sajari-react/pipeline/Response'
import { RegisterNamespace } from 'sajari-react/api'
import { PipelineSummary, Results } from 'sajari-react/ui/Results'
import { makePipelineSearchRequest } from 'sajari-react/api/actions/pipeline'
import PipelineInput from 'sajari-react/pipeline/PipelineInput'

import './styles.css'

class app extends React.Component {
  componentDidMount() {
    if (!this.props.config.searchBox) {
      // If the search box isn't active, perform a search once the component has mounted
      // This is for when there is a query param in the url and we just want to show the results
      this.props.search()
    }
  }

  render() {
    const { project, collection, pipeline, values, searchBox, searchBoxPlaceHolder } = this.props.config

    // Don't render Value of q if the search box is active. It will handle the q value.
    const isNotQ = v => searchBox ? v !== 'q' : v

    // Render the list of values
    const renderedValues = Object.keys(values).filter(isNotQ).map(k => (
      <Value key={k} pipeline={pipeline} name={k} value={values[k]}/>
    ))

    return (
      <div>
        <RegisterNamespace project={project} collection={collection}/>
        <Pipeline name={pipeline}/>
        {searchBox ? <PipelineInput pipeline={pipeline} initialValue={values.q} placeHolder={searchBoxPlaceHolder} /> : null}
        {renderedValues}
        <Response pipeline={pipeline}>
          <PipelineSummary pipeline={pipeline} />
          <Results/>
        </Response>
      </div>
    )
  }
}

const App = connect(
  null,
  (dispatch, props) => ({
    search: () => dispatch(makePipelineSearchRequest('default', props.config.pipeline))
  })
)(app)

export default App
