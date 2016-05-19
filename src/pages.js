export const pages = { }

{
  const context = require.context('./site', true, /\.html\.js$/)
  for (const key of context.keys()) {
    const file = key.replace(/^[^\/]+/, '').replace(/\.html\.js$/, '.html')
    pages[file] = () => context(key).render()
  }
}
