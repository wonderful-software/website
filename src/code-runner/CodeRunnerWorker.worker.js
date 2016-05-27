/* global postMessage, self */

import encode from '../serializr/encode'

function ____USER_CODE____ () {
  var self
  var postMessage
  var console = {
    log: (...args) => {
      postMessage({ type: 'console.log', args: encode(args) })
    }
  }
  void self
  void postMessage
  void console
  eval(arguments[0]) // eslint-disable-line no-eval
}

self.onmessage = function (e) {
  postMessage({ type: 'started' })
  try {
    ____USER_CODE____(e.code)
    postMessage({ type: 'completed' })
  } catch (e) {
    postMessage({ type: 'errored', message: e.message, stack: e.stack })
  } finally {
    postMessage({ type: 'done' })
  }
}
