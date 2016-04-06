import Helmet from 'react-helmet'
import h from './Layout.styl'
import { Link } from 'react-router'

export default ({ children }) => h('div.root', [
  h(Helmet, {
    title: 'wonderful.software'
  }),
  h('div.header', [
    h(Link, { to: '/' }, [ 'wonderful.software' ])
  ]),
  h('div.contents', { }, children),
  h('div.footer', { }, [
    'a little blog about becoming a better software developer…'
  ])
])
