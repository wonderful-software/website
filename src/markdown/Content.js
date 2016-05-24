
import h from './Content.styl'
import cx from 'classnames'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import _ from 'lodash'

import CodeBlock from 'ws/code-block/CodeBlock'

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
        return h(Component, this.props)
      } else if (this.state.status === 'error') {
        return h('div', 'ERROR!!!')
      } else if (this.state.status === 'loading') {
        return h('div.lazyWidget.isLoading', '(loading widget…)')
      }
    }
  })
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

function reducer (state = { }, action) {
  switch (action.type) {
    case 'REGISTER_CODE':
      return { ...state, [action.key]: action.value }
  }
}

let _nextStoreKey = 1

export default React.createClass({
  getStore () {
    return this.store || (this.store = createStore(reducer))
  },
  getStoreKey () {
    return this.storeKey || (this.storeKey = (_nextStoreKey += 1))
  },
  render () {
    const { content, size, main } = this.props
    return h(Provider, { store: this.getStore(), key: this.getStoreKey() }, [
      h('div', {
        styleName: cx('root', `size-${size || 'normal'}`, { 'is-main': !!main })
      }, [ createUnpacker(elements)(content) ])
    ])
  }
})
