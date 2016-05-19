
const markdown = require('./markdown')
const frontMatter = require('front-matter')

module.exports = source => {
  const data = frontMatter(source.toString())
  return JSON.stringify({
    attributes: data.attributes,
    body: markdown(data.body)
  })
}
