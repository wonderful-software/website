import React from 'react'
import h from 'react-hyperscript'
import { pure } from 'recompose'
import { Link } from 'react-router'

const enhance = pure

export const SeriesContentFooter = ({ nextPage, previousPage }) => (
  h('div', { }, [
    ...(!previousPage ? [ ] : [
      h(Link, { to: previousPage.path }, 'Previous page')
    ]),
    ' ',
    ...(!nextPage ? [ ] : [
      h(Link, { to: nextPage.path }, 'Next page')
    ])
  ])
)

SeriesContentFooter.propTypes = {
  nextPage: React.PropTypes.object,
  previousPage: React.PropTypes.object,
  currentPageNumber: React.PropTypes.number
}

export default enhance(SeriesContentFooter)
