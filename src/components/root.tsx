import { useState } from 'react'
import * as styles from '../styles/root.module.css'
import { Dashboard } from './dashboard'

const reactNy = new URL('../images/react-ny.svg', import.meta.url)
const atilaio = new URL('../images/atilaio.svg', import.meta.url)

export function Root() {
  const [data, setData] = useState<string>('')
  return (
    <>
      <header className={styles.top}>
        <a href="https://reactnewyork.com">
          <img src={reactNy.href} className={styles.logo} alt="" />
        </a>
      </header>
      <div className={styles.wrapper}>
        <Dashboard setData={setData} />
        <button
          className={styles.boop}
          onClick={() => {
            const screen = document.querySelector('#screen') as HTMLDivElement
            const img = document.createElement('img')
            img.src = reactNy.href
            img.alt = 'React New York'
            screen.appendChild(img)
          }}
        >
          boop
        </button>
        <div
          id="screen"
          className={styles.screen}
          style={{
            backgroundColor: `${data === 'loading' ? 'orange' : 'transparent'}`,
          }}
        />
        <span>{data}</span>
      </div>
      <footer className={styles.bottom}>
        <a href="https://atila.io">
          <img
            className={styles.atila}
            src={atilaio.href}
            alt="atila.io logo"
          />
        </a>
      </footer>
    </>
  )
}
