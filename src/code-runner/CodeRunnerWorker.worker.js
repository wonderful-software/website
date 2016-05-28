/* global postMessage, self */

void (function () {
  const { createSuiteBuilder } = require('./createSuiteBuilder')
  const CodeRunnerWorkerServices = require('./CodeRunnerWorkerServices')

  function processStackTrace (stack) {
    const lines = String(stack).split('\n')
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
      if (result.functionName === '____RUN_TEST_SUITE____') break
      out.push(result)
    }
    return out
  }

  self.onmessage = function (e) {
    postMessage({ type: 'started' })
    try {
      const suiteBuilder = createSuiteBuilder()
      ____USER_CODE____(e.data.code, CodeRunnerWorkerServices, suiteBuilder)
      const suite = suiteBuilder.getSuite()
      if (!suite.isEmpty()) {
        ____RUN_TEST_SUITE____(suite)
      }
      postMessage({ type: 'completed' })
    } catch (e) {
      postMessage({
        type: 'error',
        message: e.message || String(e),
        stack: processStackTrace(e.stack)
      })
    } finally {
      postMessage({ type: 'done' })
    }
  }

  function ____RUN_TEST_SUITE____ (rootSuite) {
    function runTest (test) {
      try {
        test.assertion()
        postMessage({ type: 'pass', title: test.title })
      } catch (e) {
        const err = { message: e.message || String(e), stack: processStackTrace(e.stack) }
        postMessage({ type: 'fail', title: test.title, err: err })
      }
    }
    function runTestSuite (suite) {
      postMessage({ type: 'suite', title: suite.title })
      try {
        for (const test of suite.tests) {
          runTest(test)
        }
        for (const childSuite of suite.children) {
          runTestSuite(childSuite)
        }
      } finally {
        postMessage({ type: 'suite end', title: suite.title })
      }
    }
    runTestSuite(rootSuite)
  }
})()

function ____USER_CODE____ () {
  var self
  var postMessage
  var { console, fakeRequire: require } = arguments[1]
  var { describe, it } = arguments[2]
  void (self, describe, it, postMessage, console, require)
  eval(arguments[0]) // eslint-disable-line no-eval
}
