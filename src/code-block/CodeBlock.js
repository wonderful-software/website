
import React from 'react'
import h from './CodeBlock.styl'
import highlight from 'ws/code-highlighter'

function renderCode (code) {
  return { __html: highlight(code, 'javascript') }
}

export const CodeBlock = React.createClass({
  render () {
    return h('pre.root', { dangerouslySetInnerHTML: renderCode(this.props.code) })
  }
})

export default CodeBlock
