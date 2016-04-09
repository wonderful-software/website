import h from 'react-hyperscript'
import App from './App'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { pages } from './pages'
import Helmet from 'react-helmet'

export const output = { }
const routes = { path: '/*', component: App }

for (const key of Object.keys(pages)) {
  output[key] = () => new Promise((resolve, reject) => {
    match({ routes, location: key }, (error, redirectLocation, renderProps) => {
      if (error) return reject(error)
      const rendered = renderToString(h(RouterContext, renderProps))
      const head = Helmet.rewind()
      const headHtml = [
        head.title.toString(),
        head.meta.toString(),
        head.link.toString()
      ].join('')
      return resolve({ body: rendered, head: headHtml })
    })
  })
}
