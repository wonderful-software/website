import Layout from 'ws/theme/Layout'

import h from './index.html.styl'

export const render = () => h(Layout, { }, [
  h('div.soon', [ 'under construction', h('br'), 'thanks for visiting!' ])
])
