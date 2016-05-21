import h from './SeriesPageTitle.styl'

export default ({ title, subtitle }) => h('div.root', [
  h('h1.title', { }, [ title ]),
  h('h2.subtitle', { }, [ subtitle ])
])
