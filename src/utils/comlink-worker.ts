import { expose } from 'comlink'
import { runBigTask } from './big-task'

const worker = {
  runBigTask: async (int: number) => await runBigTask(int, 'comlink-worker'),
}

export type ComlinkWorker = typeof worker

expose(worker)
