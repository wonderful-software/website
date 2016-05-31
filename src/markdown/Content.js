
import h from './Content.styl'
import cx from 'classnames'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import _ from 'lodash'
import invariant from 'invariant'

import CodeBlock from 'ws/code-block/CodeBlock'
import createTreeToReactElement from './createTreeToReactElement'

const elements = {
  'x-code-block': CodeBlock,
  'x-code-run-log': lazy(() => System.import('ws/code-run-log/CodeRunLog'))
}

function lazy (loadModule) {
  loadModule = _.once(loadModule)
  return React.createClass({
    getInitialState () {
      return { status: 'loading' }
    },
    componentDidMount () {
      loadModule()
      .then(
        componentModule => {
          this.setState({ status: 'completed', component: componentModule.default })
        },
        error => {
          this.setState({ status: 'error', error: error })
        }
      )
    },
    render () {
      if (this.state.status === 'completed') {
        const Component = this.state.component
        return h(Component, { ...this.props })
      } else if (this.state.status === 'error') {
        return h('div', 'ERROR!!!')
      } else if (this.state.status === 'loading') {
        return h('div.lazyWidget.isLoading', '(loading widget…)')
      }
    }
  })
}

function reducer (state = { }, action) {
  switch (action.type) {
    case 'REGISTER_CODE':
      return { ...state, [action.key]: action.value }
  }
}

let _nextStoreKey = 1

function appendEndContent (endContent) {
  return function (div) {
    invariant(div.type === 'div', 'element must be a div, %s given', div.type)
    const children = React.Children.toArray(div.props.children)
    const newChildren = [ ...children ]
    const indexOfFootnoteSeparator = _.findIndex(children, isFootnoteSeparator)
    const targetIndex = (indexOfFootnoteSeparator === -1
      ? children.length // insert at the end
      : indexOfFootnoteSeparator // insert before footnote separator
    )
    newChildren.splice(targetIndex, 0, endContent)
    return React.cloneElement(div, { }, ...newChildren)
  }

  function isFootnoteSeparator (element) {
    return element.type === 'hr' && /footnotes-sep/.test(element.props.className)
  }
}

export function MainBlock ({ children }) {
  return h('div', { className: '‼︎ △' }, [ children ])
}

export default React.createClass({
  getStore () {
    return this.store || (this.store = createStore(reducer))
  },
  getStoreKey () {
    return this.storeKey || (this.storeKey = (_nextStoreKey += 1))
  },
  render () {
    const { content, size, main } = this.props
    const node = _.flow(
      createTreeToReactElement(elements),
      appendEndContent(this.props.endContent)
    )(content)
    return h(Provider, { store: this.getStore(), key: this.getStoreKey() }, [
      h('div', {
        styleName: cx('root', `size-${size || 'normal'}`, { 'is-main': !!main })
      }, [ node ])
    ])
  }
})
