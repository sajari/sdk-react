import React from 'react'

import { connect } from 'react-redux'

import { Limit, Offset } from '../api'

import { setPage } from './actions/Search'


const pageNumbers = (page, totalPages) => {
  const pages = []

  let i = 2
  while (i >= 0) {
    if (page - i > 0) {
      pages.push(page-i)
    }
    i--
  }

  i = 1
  while (pages.length < 5 && page + i <= totalPages) {
    pages.push(page+i)
    i++
  }

  i = 3
  while (pages.length < 5 && page - i > 0) {
    pages.shift(page-i)
    i++
  }
  return pages
}

const Paginator = ({ resultsPerPage, page, totalResults, setPage }) => {
  if (totalResults <= resultsPerPage) {
    return null
  }

  const totalPages = Math.ceil(totalResults/resultsPerPage)
  if (totalPages === 0) {
    return null
  }

  const pages = pageNumbers(page, totalPages).map(p => (<Page key={p} page={p}>{p}</Page>))

  const prevPage = () => {
    if (page === 1) {
      return
    }
    setPage(page-1)
  }

  const nextPage = () => {
    if (page === totalPages) {
      return
    }
    setPage(page+1)
  }

  return (
    <div className='sj-paginator'>
      <div className={page === 1 ? 'disabled' : undefined} onClick={prevPage}>&lt;</div>
      {pages}
      <div className={page === totalPages ? 'disabled' : undefined} onClick={nextPage}>&gt;</div>
    </div>
  )
}

Paginator.propTypes = {
  resultsPerPage: React.PropTypes.number.isRequired,
  page: React.PropTypes.number.isRequired,
  totalResults: React.PropTypes.number.isRequired
}

const WrappedPaginator = connect(
  (state, props) => {
    const queryStatus = state.query.queryStatus[props.namespace]
    let totalResults = 0
    if (queryStatus && queryStatus.data) {
      totalResults = parseInt(queryStatus.data.searchResponse.totalResults, 10)
    }
    return {
      page: state.search.page,
      resultsPerPage: state.search.resultsPerPage,
      totalResults
    }
  },
  (dispatch) => ({ setPage: (page) => dispatch(setPage(page)) })
)(Paginator)

WrappedPaginator.defaultProps = {
  namespace: 'default'
}

const pageLimitOffset = ({ page, resultsPerPage, ...others }) => (
  <div>
    <Limit limit={resultsPerPage} { ...others } />
    <Offset offset={(page - 1) * resultsPerPage} runOnUpdate={true} { ...others} />
  </div>
)

pageLimitOffset.propTypes = {
  page: React.PropTypes.number,
  resultsPerPage: React.PropTypes.number
}

pageLimitOffset.defaultProps = {
  page: 1,
  resultsPerPage: 10
}

/* PageLimitOffset renders Limit and Offset api-components which correspond
 * to the current page and resultsPerPage */
const PageLimitOffset = connect(
  ({ search }) => ({ page: search.page, resultsPerPage: search.resultsPerPage }),
)(pageLimitOffset)

const page = ({ currentPage, page, setPage, children }) => (
  <div className={currentPage === page ? 'current' : null} onClick={() => setPage(page)}>{ children }</div>
)

/* Page is a component which renders a component which can set the page */
const Page = connect(
  ({ search }) => ({ currentPage: search.page }),
  dispatch => ({ setPage: (page) => dispatch(setPage(page)) })
)(page)

export { PageLimitOffset, WrappedPaginator, Paginator }
