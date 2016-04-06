'use strict'

const katex = require('katex')

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

// markdown.renderer.rules.softbreak = () => '<span class="Typeのเว้นวรรคใหญ่"> </span\n>'

// markdown.renderer.rules.fence = (tokens, idx, options, env, slf) => {
//   const token = tokens[idx]
//   const code = token.content
//   return (
//     '<div class="Typeのcode">' +
//       renderCodeBlock(code, token.info) +
//     '</div>'
//   )
// }

module.exports = body => {
  return { __html: markdown.render(body) }
}

module.exports.withBreaks = body => {
  return { __html: markdownBreaks.render(body) }
}
