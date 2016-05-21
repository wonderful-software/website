
function parseModuleName (moduleName) {
  const parts = moduleName.split('/').slice(1)
  const seriesName = parts[0]
  if (parts[1] === 'info.yml') {
    return { type: 'seriesInfo', seriesName }
  } else {
    const episodeKey = parts[1]
    const episodeName = episodeKey.replace(/^ep\w+-/, '')
    if (parts[2] === 'info.yml') {
      return { type: 'episodeInfo', seriesName, episodeKey, episodeName }
    } else if (/\.md$/.test(parts[2])) {
      const pageKey = parts[2]
      const pageName = pageKey.replace(/^p\w+-/, '').replace(/\.md$/, '')
      return { type: 'episodeData', seriesName, episodeKey, episodeName, pageKey, pageName }
    } else {
      console.warn('Unable to make sense of ' + moduleName)
    }
  }
}

function createBuilder () {
  const pages = [ ]
  const series = [ ]
  const episodes = [ ]
  function handleFile (key, data) {
    const role = parseModuleName(key)
    switch (role.type) {
      case 'seriesInfo':
        series.push({
          path: ('/' + role.seriesName + '/index.html'),
          key,
          seriesName: role.seriesName,
          attributes: data
        })
        break
      case 'episodeInfo':
        episodes.push({
          key,
          seriesName: role.seriesName,
          episodeName: role.episodeName,
          attributes: data
        })
        break
      case 'episodeData':
        pages.push({
          path: ('/' +
            role.seriesName + '/' +
            role.episodeName + '/' +
            (role.pageName === 'index' ? 'index' : role.pageName + '/index') +
            '.html'
          ),
          key,
          seriesName: role.seriesName,
          episodeName: role.episodeName,
          pageName: role.pageName,
          attributes: data
        })
        break
      default:
        console.warn('Unable to handle role %s', role.type)
    }
  }
  function getResult () {
    return { series, episodes, pages }
  }
  return { handleFile, getResult }
}

const builder = createBuilder()

{
  const context = require.context('!!json!markdown-loader?-body!ws/series', true, /\.md$/)
  for (const key of context.keys()) {
    builder.handleFile(key, context(key).attributes)
  }
}

{
  const context = require.context('ws/series', true, /\.yml$/)
  for (const key of context.keys()) {
    builder.handleFile(key, context(key))
  }
}

const result = builder.getResult()
console.log(result)

export const { series, episodes, pages } = result
