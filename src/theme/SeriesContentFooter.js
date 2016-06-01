import React from 'react'
import h from './SeriesContentFooter.styl'
import { pure } from 'recompose'
import { Link } from 'react-router'

const enhance = pure

const renderWhen = (predicate, render) => predicate ? render() : [ ]

export const SeriesContentFooter = ({
  nextPage,
  previousPage,
  currentPageNumber,
  pageCount,
  currentSeries,
  currentEpisode
}) => (
  h('div.root', { }, [
    h('div.nav', { }, [
      ...renderWhen(previousPage, () => [
        h(Link, { styleName: 'prev', to: previousPage.path }, '←')
      ]),
      h('.spacer'),
      ...renderWhen(nextPage, () => [
        h(Link, { styleName: 'next', to: nextPage.path }, 'Next page →')
      ])
    ]),
    h('div.metadata', { }, [
      'คุณกำลังอ่านบทความ',
      ...renderWhen(currentSeries && currentEpisode, () => [
        'จากชุดบทความ ',
        h('em', { }, [ currentSeries.attributes.title ]),
        ' ตอน ',
        h('em', { }, [ currentEpisode.attributes.title ]),
        ' '
      ]),
      h('br'),
      'หน้าที่ ',
      currentPageNumber,
      ' จากทั้งหมด ',
      pageCount,
      ' หน้า'
    ])
  ])
)

SeriesContentFooter.propTypes = {
  nextPage: React.PropTypes.object,
  previousPage: React.PropTypes.object,
  currentPageNumber: React.PropTypes.number,
  pageCount: React.PropTypes.number
}

export default enhance(SeriesContentFooter)
