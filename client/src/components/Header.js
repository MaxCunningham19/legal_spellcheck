import React, {useState} from 'react'
import { Button } from './Button'
import styles from './Header.module.css'

function Header() {
  return (
    <>
      <header className={styles['Header']}>
        <div className={styles['header-container']}>
          <div className={styles['empty-container']}>

          </div>
          <div className={styles['icons-container']}>
            
          </div>
          <div className={styles['action-container']}>
            <Button buttonStyle="actionbar-save" text="Save"></Button>
            <Button buttonStyle="actionbar-validate" text="Validate"></Button>

          </div>
        </div>
      </header>  
    </>
  )
}

export default Header