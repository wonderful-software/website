import Layout from 'ws/theme/Layout'

import h from '../theme/textures.styl'

const Texture = ({ name }) => h('div', {
  styleName: name,
  style: { marginTop: 35, padding: 35 }
}, [ name ])

export const render = () => h(Layout, { }, [
  h('div', { style: { maxWidth: 700, margin: '0 auto' } }, [
    h(Texture, { name: 'background-g50' }),
    h(Texture, { name: 'background-g100' }),
    h(Texture, { name: 'background-g150' }),
    h(Texture, { name: 'background-g200' }),
    h(Texture, { name: 'color-g300' }),
    h(Texture, { name: 'color-g400' }),
    h(Texture, { name: 'color-g500' }),
    h(Texture, { name: 'color-g600' }),
    h(Texture, { name: 'color-g700' }),
    h(Texture, { name: 'color-g800' }),
    h(Texture, { name: 'text-center' }),
    h(Texture, { name: 'color-dim' })
  ])
])
