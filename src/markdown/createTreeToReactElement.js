import React from 'react'

function createTreeToReactElement (map) {
  return function treeToReactElement (element) {
    if (Array.isArray(element)) {
      const [ name, props, ...children ] = element
      const unpackedChildren = children.map(treeToReactElement)
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

export default createTreeToReactElement
