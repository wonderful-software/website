
import types from './types'

function decode (stuff) {
  const decoded = stuff.map((element) => {
    const type = element[0]
    const arg = element[1]
    return types[type].init(arg)
  })
  for (let i = 0; i < decoded.length; i++) {
    const type = stuff[i][0]
    const resolve = types[type].resolve
    if (resolve) resolve(decoded[i], stuff[i][1], j => decoded[j])
  }
  return decoded[0]
}

module.exports = decode
