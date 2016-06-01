
import App from './App'
import h from 'react-hyperscript'
import { render } from 'react-dom'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll'

export function runPage () {
  const routes = { path: '/*', component: App }
  const router = h(Router, {
    history: browserHistory,
    routes: routes,
    render: applyRouterMiddleware(useScroll())
  })
  render(router, document.getElementById('react'))
}
