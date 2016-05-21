import Content from 'ws/markdown/Content'
import Layout from './Layout'
import SeriesPageTitle from './SeriesPageTitle'
import h from 'react-hyperscript'

export default function renderSeriesContentPage (data) {
  return h(Layout, { }, [
    h(SeriesPageTitle, {
      title: data.attributes.title,
      subtitle: data.attributes.subtitle
    }),
    h(Content, { content: data.body, main: true })
  ])
}
