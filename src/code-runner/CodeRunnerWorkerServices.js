/* global postMessage */
import encode from '../serializr/encode'

export const console = {
  log: (...args) => {
    postMessage({ type: 'console.log', args: encode(args) })
  }
}
