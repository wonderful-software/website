import { compose, pure, mapProps, withPropsOnChange } from 'recompose'
import h from 'react-hyperscript'
import Content, { MainBlock } from 'ws/markdown/Content'
import _ from 'lodash'
import { pages } from '../site-config/series'
import SeriesContentFooter from './SeriesContentFooter'

export function getSiblingPages (targetPage) {
  return (_.chain(pages)
    .filter({ seriesName: targetPage.seriesName, episodeName: targetPage.episodeName })
    .sortBy('key')
    .value()
  )
}

const enhance = compose(
  withPropsOnChange([ 'page' ], ({ page }) => {
    const siblingPages = getSiblingPages(page)
    const currentPageIndex = _.findIndex(siblingPages, { key: page.key })
    const nextPage = siblingPages[currentPageIndex + 1]
    const previousPage = siblingPages[currentPageIndex - 1]
    return {
      endContent: h(MainBlock, { }, [
        h(SeriesContentFooter, {
          nextPage,
          previousPage,
          currentPageNumber: currentPageIndex + 1
        })
      ])
    }
  }),
  mapProps(({ page, ...rest }) => rest),
  pure
)

export default enhance(Content)
