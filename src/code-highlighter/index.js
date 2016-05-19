'use strict'

const CodeMirror = require('codemirror/addon/runmode/runmode.node')
require('codemirror/mode/javascript/javascript')

module.exports = require('highlight-with-codemirror')(CodeMirror)
