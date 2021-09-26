import { useState } from 'react'
import { runBigTask, runBigTaskAsync } from '../utils/big-task'
import { wrap } from 'comlink'

export function Root() {
  const [data, setData] = useState<string>('')
  return (
    <div
      style={{
        backgroundColor: `${data === 'loading' ? 'orange' : 'transparent'}`,
      }}
    >
      <button
        onClick={() => {
          console.log('boop')
        }}
      >
        boop
      </button>
      <button
        onClick={() => {
          setData('loading')

          setData(runBigTask(10, 'sync'))
        }}
      >
        Run Sync
      </button>
      <button
        onClick={async () => {
          setData('loading')

          setData(await runBigTaskAsync(10))
        }}
      >
        Run Async
      </button>
      <button
        onClick={async () => {
          setData('loading')
          const worker = new Worker(
            new URL('../utils/comlink-worker', import.meta.url),
            {
              name: 'runBigTaskWorker',
              type: 'module',
            }
          )

          const { runBigTask } =
            wrap<import('../utils/comlink-worker').RunBigTaskWorker>(worker)
          setData(await runBigTask(10))
        }}
      >
        Run Comlink-WebWorker
      </button>
      <button
        onClick={async () => {
          setData('loading')
          const worker = new Worker(
            new URL('../utils/vanilla-worker', import.meta.url),
            {
              name: 'vanilla-worker',
              type: 'module',
            }
          )

          worker.postMessage(10)

          worker.addEventListener('message', function (evt) {
            setData(evt.data)
          })
        }}
      >
        Run Vanilla-WebWorker
      </button>
      <span>{data}</span>
    </div>
  )
}
