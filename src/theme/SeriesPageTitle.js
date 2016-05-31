import h from './SeriesPageTitle.styl'
import { pure } from 'recompose'

export default pure(({ title, subtitle }) => h('div.root', [
  h('h1.title', { }, [ title ]),
  h('h2.subtitle', { }, [ subtitle ])
]))
