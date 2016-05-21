
import App from './App'
import h from 'react-hyperscript'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

export function runPage () {
  const routes = { path: '/*', component: App }
  const router = h(Router, { history: browserHistory, routes: routes })
  render(router, document.getElementById('react'))
}
