import React from 'react'
import renderPage from './renderPage'

const App = React.createClass({
  getInitialState () {
    return { pages: require('./pages').pages }
  },
  componentDidMount () {
    if (module.hot) {
      module.hot.accept('./pages', () =>
        this.setState({ pages: require('./pages').pages })
      )
    }
  },
  render () {
    const pages = this.state.pages.default || this.state.pages
    return renderPage(this.props.location, pages)
  }
})

export default App
