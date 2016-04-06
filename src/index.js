import App from './App'
import h from 'react-hyperscript'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

const routes = { path: '/*', component: App }
const router = h(Router, { history: browserHistory, routes: routes })
render(router, document.getElementById('react'))
