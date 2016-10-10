import React, { Component, Children, cloneElement } from 'react'

import PageStore from '../stores/PageStore'
import PageActions from '../actions/PageActions'
import SearchActions from '../actions/SearchActions'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onPageChange = this.onPageChange.bind(this)
  }

  componentDidMount() {
    this.onPageChange()
    PageStore.addChangeListener(this.onPageChange)
  }

  componentWillUnmount() {
    PageStore.removeChangeListener(this.onPageChange)
  }

  onPageChange() {
    const page = PageStore.get(this.props.namespace)
    this.setState({ page })
  }

  render() {
    const { children, namespace, ...others } = this.props
    const { page } = this.state

    const props = {
      page,
      next: () => {
        PageActions.next(namespace)
        SearchActions.nsearch(namespace)
      },
      prev: () => {
        PageActions.prev(namespace)
        SearchActions.nsearch(namespace)
      },
      set: p => {
        PageActions.set(namespace, p)
        SearchActions.nsearch(namespace)
      },
      ...others,
    }

    const childrenWithProps = Children.map(this.props.children, c => (
      cloneElement(c, props)
    ))

    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

Pagination.propTypes = {
  namespace: React.PropTypes.string,
}

Pagination.defaultProps = {
  namespace: 'default',
}

export default Pagination
