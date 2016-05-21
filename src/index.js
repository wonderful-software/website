import App from './App'
import h from 'react-hyperscript'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { loadCSS } from 'fg-loadcss'
import './index.styl'

const routes = { path: '/*', component: App }
const router = h(Router, { history: browserHistory, routes: routes })
render(router, document.getElementById('react'))

loadCSS('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,400italic,600italic,700italic|Roboto+Mono:400,700')
