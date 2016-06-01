import Layout from './Layout'
import SeriesPageTitle from './SeriesPageTitle'
import SeriesContent from './SeriesContent'
import h from 'react-hyperscript'

export default function renderSeriesContentPage (page, data) {
  return h(Layout, { }, [
    h(SeriesPageTitle, {
      title: data.attributes.title,
      subtitle: data.attributes.subtitle
    }),
    h(SeriesContent, { page, content: data.body, main: true })
  ])
}
