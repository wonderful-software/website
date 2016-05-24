
import React from 'react'
import h from './CodeBlock.styl'
import _ from 'lodash'
import 'codemirror/lib/codemirror.css'
import { connect } from 'react-redux'

const getCodeMirror = _.once(() => System.import('./codemirror'))

export const CodeBlock = React.createClass({
  getDefaultProps () {
    return { editable: false }
  },
  getInitialState () {
    return { editing: false }
  },
  render () {
    if (this.props.editable && this.state.editing) {
      return h('div.root', { ref: (element) => (this._cmContainer = element) })
    } else {
      return h('pre.root', { }, this.props.children)
    }
  },
  componentDidMount () {
    if (this.props.name) {
      this.props.onTextUpdate(this.props.code)
    }
    if (this.props.editable && !this.state.editing) {
      if (!this._loadingEditor) {
        this._loadingEditor = true
        getCodeMirror().then(({ CodeMirror }) => {
          this._CodeMirror = CodeMirror
          this.setState({ editing: true })
        })
      }
    }
  },
  componentDidUpdate () {
    const element = this._cmContainer
    if (element) {
      if (!this._codeMirror) {
        const CodeMirror = this._CodeMirror
        this._codeMirror = CodeMirror(element, {
          value: this.props.code,
          mode: 'javascript',
          viewportMargin: Infinity,
          theme: 'wonderfulsoftware'
        })
        this._codeMirror.on('change', () => {
          if (this.props.name) {
            this.props.onTextUpdate(this._codeMirror.getValue())
          }
        })
      }
    }
  }
})

export default connect(() => ({ }), (dispatch, props) => ({
  onTextUpdate: (text) => dispatch({
    type: 'REGISTER_CODE',
    key: props.name,
    value: text
  })
}))(CodeBlock)
