import h from './CodeRunLog.styl'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Observable } from 'rx'
import { mapPropsStream } from 'rx-recompose'
import cx from 'classnames'
import _ from 'lodash'

function runCode (code) {
  const consoleLog = [ ]
  return new Promise((resolve, reject) => {
    const console = { log: (x) => consoleLog.push(x) }
    try {
      const f = new Function('console', code)
      f(console)
      resolve(consoleLog)
    } catch (e) {
      reject(e)
    }
  })
}

function state川ForProps川 (props川) {
  const textEditors川 = (props川
    .map(props => props.from.map(_.propertyOf(props.state)))
    .distinctUntilChanged(JSON.stringify)
  )
  const result川 = (textEditors川
    .flatMapLatest((code) =>
      Observable.fromPromise(
        runCode(code.join('\n;\n'))
        .then(result => ({ state: 'completed', result: result.join('\n') }))
        .catch(error => ({ state: 'error', error: error }))
      )
      .startWith({ state: 'running', result: '(running…)' })
    )
    .debounce(138)
  )
  return result川.startWith({ state: 'running', result: '(running…)' })
}

const enhance = compose(
  connect(state => ({ state })),
  mapPropsStream(props川 => Observable.combineLatest(
    props川, state川ForProps川(props川),
    (props, state) => ({ ...props, ...state })
  ))
)

const CodeRunLog = ({ result, state, error }) => h('pre', {
  styleName: cx('root', {
    isRunning: state === 'running',
    isErrored: state === 'error'
  })
}, [ error ? error.toString() : result ])

export default enhance(CodeRunLog)
