
import h from 'react-hyperscript'

const notFound = () => h('div', [ 'Page not found!!' ])

export function renderPage (location, pages) {
  const render = (
    pages[location.pathname] ||
    pages[location.pathname.replace(/\/$/, '/index.html')] ||
    pages['/404.html'] ||
    notFound
  )
  return render(location)
}

export default renderPage
