
function createBuilder () {
  const pages = [ ]
  function handleMarkdownFile (moduleName, use) {
    const [ seriesName, episodeId, pageId ] = moduleName.split('/').slice(1)
    const episodeName = episodeId.replace(/^ep\w+-/, '')
    const pageName = pageId.replace(/^p\w+-/, '').replace(/\.md$/, '')
    pages.push({
      path: ('/' +
        seriesName + '/' +
        episodeName + '/' +
        (pageName === 'index' ? 'index' : pageName + '/index') +
        '.html'
      ),
      key: moduleName
    })
  }
  function getResult () {
    return { pages }
  }
  return { handleMarkdownFile, getResult }
}

const context = require.context('!!json!markdown-loader?-body!ws/series', true, /\.md$/)
const builder = createBuilder()
for (const key of context.keys()) {
  builder.handleMarkdownFile(key, context(key).attributes)
}

export const { pages } = builder.getResult()
