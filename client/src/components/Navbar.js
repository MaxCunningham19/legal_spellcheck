import React, {useState} from 'react'
import { Button } from './Button'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <>   
      <nav className={styles['Navbar']}>
          <div className={styles['navbar-container']}>
            <div className={styles['buttons-container']}>
              <Button buttonStyle="icon-navbar-plain" text=" 🗎 My Documents"></Button>
              <Button buttonStyle="icon-navbar-plain" text=" 🗀 Browse"></Button>
            </div>
          </div>
      </nav>
    </>
  )
}

export default Navbar