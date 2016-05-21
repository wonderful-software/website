import Layout from 'ws/theme/Layout'
import Content from 'ws/markdown/Content'
import h from 'react-hyperscript'

export default function renderSeriesContentPage (data) {
  return h(Layout, { }, [
    h(Content, { content: data.body, main: true })
  ])
}
