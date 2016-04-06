import h from 'react-hyperscript'
import React from 'react'
import App from './App'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import renderPage from './renderPage'
import { pages } from './pages'

export const output = { }
const routes = { path: '/*', component: App }

for (const key of Object.keys(pages)) {
  output[key] = () => new Promise((resolve, reject) => {
    match({ routes, location: key }, (error, redirectLocation, renderProps) => {
      if (error) return reject(error)
      const rendered = renderToString(h(RouterContext, renderProps))
      return resolve({ body: rendered })
    })
  })
}
