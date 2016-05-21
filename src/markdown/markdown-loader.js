
const markdown = require('./markdown')
const htmlToTree = require('./htmlToTree')
const frontMatter = require('front-matter')

module.exports = source => {
  const data = frontMatter(source.toString())
  return JSON.stringify({
    attributes: data.attributes,
    body: htmlToTree(markdown(data.body))
  })
}
