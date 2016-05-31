/* eslint pure/pure: 2 */
import u from 'updeep'

const initialState = { state: 'running', console: [ ], suiteLevel: -1 }

export function reducer (state = initialState, event) {
  return updater(event)(state)
}

function updater (event) {
  switch (event.type) {
    case 'reset':
      return () => initialState
    case 'console.log': {
      const text = event.args.join(' ')
      return u({
        console: writeToConsole(event._id, 'log', { text })
      })
    }
    case 'error':
      return u({
        state: 'error',
        console: writeToConsole(event._id, 'error', { message: event.message })
      })
    case 'suite':
      return (state) => u({
        suiteLevel: (level) => level + 1,
        console: (state.suiteLevel > -1
          ? writeToConsole(event._id, 'suite', { title: event.title, indent: state.suiteLevel })
          : (state) => state
        )
      })(state)
    case 'pass':
      return (state) => u({
        console: writeToConsole(event._id, 'pass', {
          title: event.title,
          indent: state.suiteLevel - 1
        })
      })(state)
    case 'fail':
      return (state) => u({
        console: writeToConsole(event._id, 'fail', {
          title: event.title,
          indent: state.suiteLevel - 1,
          message: event.err.message
        })
      })(state)
    case 'suite end':
      return u({
        suiteLevel: (level) => level - 1
      })
    case 'completed':
      return u({ state: 'completed' })
    default:
      return (state) => state
  }
}

function writeToConsole (_id, type, data) {
  return (state) => [ ...state, { _id, type, ...data } ]
}

export default reducer
