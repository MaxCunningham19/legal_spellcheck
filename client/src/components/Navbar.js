import React, {useState} from 'react'
import { Button } from './Button'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <>   
        <nav className={styles['Navbar']}>
            <div className={styles['navbar-container']}>
            <div className={styles['empty-container']}>
              </div>
              <div className={styles['buttons-container']}>
                <Button buttonStyle="navbar-plain" text=" 🗎 My Documents"></Button>

              </div>
              <div className={styles['buttons2-container']}>
                <Button buttonStyle="navbar-plain" text=" 🗀 Browse"></Button>

              </div>
              <div className={styles['empty-container']}>
              </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar