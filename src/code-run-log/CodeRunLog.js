import h from './CodeRunLog.styl'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Observable } from 'rx'
import { mapPropsStream } from 'rx-recompose'
import cx from 'classnames'
import _ from 'lodash'
import runCode from '../code-runner/runCode'

function state川ForProps川 (props川) {
  const initialState = { state: 'running', console: [ ], suiteLevel: 0 }
  const textEditors川 = (props川
    .map(props => props.from.map(_.propertyOf(props.state)))
    .distinctUntilChanged(JSON.stringify)
  )
  function reducer (state, event) {
    switch (event.type) {
      case 'reset':
        return initialState
      case 'console.log': {
        const text = event.args.join(' ')
        return { ...state,
          console: [ ...state.console,
            { _id: event._id, type: 'log', text }
          ]
        }
      }
      case 'error':
        return { ...state,
          state: 'error',
          console: [ ...state.console,
            { _id: event._id, type: 'error', message: event.message }
          ]
        }
      case 'suite':
        return { ...state,
          suiteLevel: state.suiteLevel + 1
        }
      case 'completed':
        return { ...state, state: 'completed' }
      default:
        return state
    }
  }
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

const CodeRunLog = ({ console, state, error }) => h('pre', {
  styleName: cx('root', {
    isRunning: state === 'running',
    isErrored: state === 'error'
  })
}, [
  console.map(entry => {
    switch (entry.type) {
      case 'error':
        return h('div.error', { key: entry._id }, [
          h('strong', { }, [ 'Error: ' ]),
          entry.message
        ])
      case 'log':
        return h('div', { key: entry._id }, entry.text)
      default:
        return null
    }
  })
])

export default enhance(CodeRunLog)
