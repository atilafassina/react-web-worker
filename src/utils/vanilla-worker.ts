import { runBigTask } from './big-task'

self.addEventListener(
  'message',
  function (event) {
    self.postMessage(runBigTask(event.data, 'vanilla-worker'))
  },
  false
)
