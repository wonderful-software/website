import Helmet from 'react-helmet'
import h from './Layout.styl'
import { Link } from 'react-router'
import Logo from './Logo'

export default ({ children }) => h('div.root', [
  h(Helmet, {
    title: 'wonderful.software'
  }),
  h('div.header', [
    h(Link, { to: '/' }, [ 'wonderful.software' ])
  ]),
  h('div.contents', { }, children),
  h('div.footer', { }, [
    h(Logo, { width: 70, monochrome: true }),
    h('br'),
    'a little blog about becoming a better software developer…'
  ])
])
