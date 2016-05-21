
import React from 'react'
import h from './CodeBlock.styl'
import highlight from 'ws/code-highlighter'

function renderCode (code) {
  return { __html: highlight(code, 'javascript') }
}

export const CodeBlock = React.createClass({
  render () {
    const code = new Buffer(this.props.code, 'base64').toString('utf8')
    return h('pre.root', { dangerouslySetInnerHTML: renderCode(code) })
  }
})

export default CodeBlock
