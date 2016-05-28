import h from './CodeRunLog.styl'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Observable } from 'rx'
import { mapPropsStream } from 'rx-recompose'
import cx from 'classnames'
import _ from 'lodash'
import runCode from '../code-runner/runCode'
import reducer from './reducer'

function state川ForProps川 (props川) {
  const initialState = reducer(undefined, { type: '@@INIT' })

  const textEditors川 = (props川
    .map(props => props.from.map(_.propertyOf(props.state)))
    .distinctUntilChanged(JSON.stringify)
  )

  return (textEditors川
    .debounce(100)
    .flatMapLatest((code) =>
      runCode({
        code: code.join('\n;\n')
      }).startWith({ type: 'reset' })
    )
    .map(event => ({ ...event, _id: _.uniqueId() }))
    .startWith(initialState)
    .scan(reducer)
    .debounce(100)
    .startWith(initialState)
    .do(x => console.log('STATE => ', x))
  )
}

const enhance = compose(
  connect(state => ({ state })),
  mapPropsStream(props川 => Observable.combineLatest(
    props川, state川ForProps川(props川),
    (props, state) => ({ ...props, ...state })
  ))
)

const indent = (level) => ({ marginLeft: (level * 35) })

const CodeRunLog = ({ console, state, error }) => h('pre', {
  styleName: cx('root', {
    isRunning: state === 'running',
    isErrored: state === 'error'
  })
}, [
  console.map(entry => h('div', { key: entry._id }, [ (() => {
    switch (entry.type) {
      case 'error':
        return h('div.error', { }, [
          h('strong', { }, [ 'Error: ' ]),
          entry.message
        ])
      case 'log':
        return h('div', { }, entry.text)
      case 'suite':
        return h('.suite', { style: indent(entry.indent) }, entry.title)
      case 'pass':
        return h('.pass', { style: indent(entry.indent) }, entry.title)
      case 'fail':
        return h('.fail', { style: indent(entry.indent) }, [
          entry.title,
          ' (' + entry.message + ')'
        ])
      default:
        return null
    }
  })() ]))
])

export default enhance(CodeRunLog)
