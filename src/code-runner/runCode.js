import CodeRunnerWorker from 'worker?inline!./CodeRunnerWorker.worker.js'
import { Observable } from 'rx'
import decode from '../serializr/decode'

let _nextDebugId = 1

export function runCode (options) {
  return Observable.create((observer) => {
    const debugId = _nextDebugId++
    const worker = new CodeRunnerWorker()
    console.log('[runCode #%s] Starting worker', debugId)
    worker.onmessage = (e) => {
      const data = e.data
      switch (data.type) {
        case 'done':
          observer.onCompleted()
          break
        case 'console.log':
          observer.onNext({ ...e.data, args: decode(e.data.args) })
          break
        default:
          console.log('[runCode #%s] Received message:', debugId, e.data)
          observer.onNext(e.data)
      }
    }
    worker.postMessage({
      code: options.code
    })
    console.log(worker)
    return () => {
      console.log('[runCode #%s] Terminating worker', debugId)
      worker.terminate()
    }
  })
}

// herp
export default runCode
