
import h from './Content.styl'
import cx from 'classnames'

export default ({ content, size, main }) => h('div', {
  styleName: cx('root', `size-${size || 'normal'}`, { 'is-main': !!main }),
  dangerouslySetInnerHTML: content
})
