import Layout from 'site/Layout'

import h from './index.html.styl'

export const render = () => h(Layout, { }, [
  h('div.soon', [ 'under construction', h('br'), 'thanks for visiting!' ])
])
