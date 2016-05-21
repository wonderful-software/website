
const markdown = require('./markdown')
const htmlToTree = require('./htmlToTree')
const frontMatter = require('front-matter')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const query = loaderUtils.parseQuery(this.query)
  const data = frontMatter(source.toString())
  return JSON.stringify({
    attributes: data.attributes,
    body: query.body === false ? undefined : htmlToTree(markdown(data.body))
  })
}
