'use strict'

const CodeMirror = require('codemirror/addon/runmode/runmode.node')
require('./modes')

module.exports = require('highlight-with-codemirror')(CodeMirror)
