/* global postMessage */
import encode from '../serializr/encode'

export const console = {
  log: (...args) => {
    postMessage({ type: 'console.log', args: encode(args) })
  }
}

export function fakeRequire (moduleName) {
  switch (moduleName) {
    case 'assert': return require('assert')
    default: throw new Error('Unknown module "' + moduleName + '"')
  }
}
