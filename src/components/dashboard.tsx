import type { FC } from 'react'
import { runBigTask, runBigTaskAsync } from '../utils/big-task'
import { wrap } from 'comlink'
import * as styles from '../styles/dashboard.module.css'

type DashboardProps = {
  setData: (param: string) => void
}

const TASK_SIZE = 90000000

const Dashboard: FC<DashboardProps> = ({ setData }) => {
  return (
    <aside className={styles.dashboard}>
      <button
        onClick={() => {
          setData('loading')

          setData(runBigTask(TASK_SIZE, 'sync'))
        }}
      >
        Run Sync
      </button>
      <button
        onClick={async () => {
          setData('loading')

          setData(await runBigTaskAsync(TASK_SIZE))
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
          setData(await runBigTask(TASK_SIZE))
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

          worker.postMessage(TASK_SIZE)

          worker.addEventListener('message', function (evt) {
            setData(evt.data)
          })
        }}
      >
        Run Vanilla-WebWorker
      </button>
    </aside>
  )
}

export { Dashboard }
