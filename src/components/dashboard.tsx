import type { FC } from 'react'
import type { ComlinkWorker } from '../utils/comlink-worker'
import { wrap } from 'comlink'
import { runBigTask, runBigTaskAsync } from '../utils/big-task'
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
        Sync
      </button>
      <button
        onClick={async () => {
          setData('loading')
          setData(await runBigTaskAsync(TASK_SIZE))
        }}
      >
        Promise
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

          const { runBigTask } = wrap<ComlinkWorker>(worker)
          setData(await runBigTask(TASK_SIZE))
        }}
      >
        Comlink WebWorker
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
        Vanilla WebWorker
      </button>
    </aside>
  )
}

export { Dashboard }
