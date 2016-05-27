'use strict'

const representable = {
  encode (x) { return x },
  init (x) { return x }
}

const unrepresentable = {
  encode (x) { throw new Error('unrepresentable') }
}

const constant = value => ({
  encode () { return '' },
  init () { return value }
})

const array = {
  encode (x, ref) {
    return Array.from(x).map(ref)
  },
  init () {
    return [ ]
  },
  resolve (array, arg, deref) {
    arg.forEach(x => array.push(deref(x)))
  }
}

module.exports = {
  date: {
    encode (date) {
      return date.getTime()
    },
    init (arg) {
      return new Date(arg)
    }
  },
  object: {
    encode (object, ref) {
      const out = { }
      for (const key of Object.keys(object)) out[key] = ref(object[key])
      return out
    },
    init () {
      return { }
    },
    resolve (object, arg, deref) {
      for (const key of Object.keys(arg)) object[key] = deref(arg[key])
    }
  },
  null: constant(null),
  undefined: constant(undefined),
  string: representable,
  boolean: representable,
  number: representable,
  regexp: {
    encode (x) { return x.toString() },
    init (x) { return eval(x) } // eslint-disable-line no-eval
  },
  array: array,
  arguments: array,
  element: unrepresentable,
  function: {
    encode (f) {
      return f.toString()
    },
    init (arg) {
      return (f => { try { f.toString = () => arg } catch (e) { }; return f })(() => { throw new Error('!!!') })
    }
  }
}
