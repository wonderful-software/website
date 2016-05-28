/* global postMessage, self */

void (function () {
  const CodeRunnerWorkerServices = require('./CodeRunnerWorkerServices')

  function processStackTrace (stack) {
    const lines = stack.split('\n')
    const out = [ ]
    for (const line of lines) {
      if (/Error:/.test(line)) continue
      const result = (() => {
        var m
        m = line.match(/^\s*at\s+([^\s@]+).*<anonymous>:(\d+)/)
        if (m) return { functionName: m[1], lineNumber: +m[2] || null }
        m = line.match(/^\s*at\s+([^\s@]+).*eval code:(\d+)/)
        if (m) return { functionName: m[1], lineNumber: +m[2] || null }
        m = line.match(/^\s*([^@]*)@.*> eval:(\d+)/)
        if (m) return { functionName: m[1], lineNumber: +m[2] || null }
        m = line.match(/^([^\s@]+)$/)
        if (m) return { functionName: m[0], lineNumber: null }
      })()
      if (!result) continue
      if (result.functionName === '____USER_CODE____') break
      out.push(result)
    }
    return out
  }

  self.onmessage = function (e) {
    postMessage({ type: 'started' })
    try {
      ____USER_CODE____(e.data.code, CodeRunnerWorkerServices)
      postMessage({ type: 'completed' })
    } catch (e) {
      postMessage({ type: 'errored', message: e.message, stack: processStackTrace(e.stack) })
    } finally {
      postMessage({ type: 'done' })
    }
  }
})()

function ____USER_CODE____ () {
  var self
  var postMessage
  var encode
  var { console } = arguments[1]
  void self
  void postMessage
  void console
  void encode
  eval(arguments[0]) // eslint-disable-line no-eval
}
