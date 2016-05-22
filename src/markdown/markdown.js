'use strict'

const highlight = require('../code-highlighter')

// const katex = require('katex')
//
// const MATH_OPTIONS = {
//   inlineOpen: '\\(',
//   inlineClose: '\\)',
//   blockOpen: '\\[',
//   blockClose: '\\]',
//   inlineRenderer: str => katex.renderToString(str),
//   blockRenderer: str => {
//     const LARGE_RE = /%large\s*$/
//     let large = false
//     if (str.match(LARGE_RE)) {
//       str = str.replace(LARGE_RE, '')
//       large = true
//     }
//     const className = classNames('TypeのdisplayMath', { 'is-large': large })
//     return (
//       `<p class="${className}"><span class="Typeのmath">` +
//       `<span class="TypeのmathPlaceholder">${escapeHtml(str)}</span>` +
//       `<script type="math/tex; mode=display">\\begin{align*}${str}\\end{align*}</script>` +
//       `</span></p>`
//     )
//   }
// }

const markdown = (
  require('markdown-it')({
    html: true,
    typographer: true,
    linkify: true
  })
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  // .use(require('markdown-it-math'), MATH_OPTIONS)
)

const markdownBreaks = (
  require('markdown-it')({
    html: true,
    typographer: true,
    breaks: true,
    linkify: true
  })
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  // .use(require('markdown-it-math'), MATH_OPTIONS)
)

markdown.renderer.rules.softbreak = () => '<span class="↩︎"> </span\n>'

markdown.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  const token = tokens[idx]
  const code = token.content
  return (
    '<div class="❯ △"><x-code-block code="' + new Buffer(code).toString('base64') + '"></x-code-block></div>'
  )
}

function typographic (html) {
  const $ = require('cheerio').load(html)
  $(':root').filter('h1, h2, h3, h4, h5, h6, p, ul, ol, pre, blockquote, .footnotes, .❯').addClass('‼︎')
  $('h1').addClass('๑ △')
  $('h2').addClass('๒ △')
  $('h3').addClass('๓ △')
  $('h4').addClass('๔ △')
  $('h5').addClass('๕ △')
  $('h6').addClass('๖ △')
  $('p').addClass('¶ △')
  $('ul').addClass('• △ ▷')
  $('ol').addClass('№ △ ▷')
  $('li').addClass('· △')
  $('pre').addClass('🄰')
  $('code').addClass('𝚊')
  $('blockquote').addClass('❝ ☐ ▷')
  $('hr').addClass('— △')
  return $.html()
}

module.exports = body => {
  return '<div class="☐">' + typographic(markdown.render(body)) + '</div>'
}
