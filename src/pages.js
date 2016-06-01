import renderSeriesContentPage from 'ws/theme/renderSeriesContentPage'
import { pages as seriesPages } from 'ws/site-config/series'

export const pages = { }

{
  const context = require.context('./site', true, /\.html\.js$/)
  for (const key of context.keys()) {
    const file = key.replace(/^[^\/]+/, '').replace(/\.html\.js$/, '.html')
    pages[file] = () => context(key).render()
  }
}

{
  const context = require.context('./series', true, /\.md$/)
  for (const page of seriesPages) {
    pages[page.path.replace(/\/$/, '/index.html')] = () => renderSeriesContentPage(page, context(page.key))
  }
}
