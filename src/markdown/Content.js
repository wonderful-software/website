
import h from './Content.styl'
import cx from 'classnames'
import React from 'react'

import CodeBlock from 'ws/code-block/CodeBlock'

const elements = {
  'x-code-block': CodeBlock
}

function createUnpacker (map) {
  return function unpack (element) {
    if (Array.isArray(element)) {
      const [ name, props, ...children ] = element
      const unpackedChildren = children.map(unpack)
      if (map[name]) {
        const parsedProps = JSON.parse(props.props)
        return React.createElement(map[name], parsedProps, ...unpackedChildren)
      } else {
        return React.createElement(name, props, ...unpackedChildren)
      }
    } else {
      return element
    }
  }
}

export default ({ content, size, main }) => h('div', {
  styleName: cx('root', `size-${size || 'normal'}`, { 'is-main': !!main })
}, [ createUnpacker(elements)(content) ])
