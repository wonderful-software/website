import { loadCSS } from 'fg-loadcss'
import './index.global.styl'

// Polyfill Promise from babel-runtime
window.Promise = Promise

loadCSS('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,600,700,400italic,600italic,700italic|Roboto+Mono:400,700|Kanit:200')

System.import('./runPage.js').then(
  ({ runPage }) => { runPage() },
  (e) => console.error('Cannot run page!', e)
)
