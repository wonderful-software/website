
import typeOf from 'type-of'
import types from './types'

function encode (data) {
  const objects = [ ]
  const visited = new Map()
  const traverse = function (value) {
    if (visited.has(value)) return visited.get(value)
    const index = objects.length
    visited.set(value, index)
    objects.push(null)
    const type = typeOf(value)
    objects[index] = [ type, types[type].encode(value, traverse) ]
    return index
  }
  traverse(data)
  return objects
}

module.exports = encode
