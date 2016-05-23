
import React from 'react'
import h from './CodeBlock.styl'

export const CodeBlock = React.createClass({
  render () {
    return h('pre.root', { }, this.props.children)
  }
})

export default CodeBlock
