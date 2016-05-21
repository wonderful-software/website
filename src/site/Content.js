
import h from './Content.styl'
import cx from 'classnames'
import React from 'react'

function unpack (element) {
  if (Array.isArray(element)) {
    const [ name, props, ...children ] = element
    return React.createElement(name, props, ...children.map(unpack))
  } else {
    return element
  }
}

export default ({ content, size, main }) => h('div', {
  styleName: cx('root', `size-${size || 'normal'}`, { 'is-main': !!main })
}, [ unpack(content) ])
