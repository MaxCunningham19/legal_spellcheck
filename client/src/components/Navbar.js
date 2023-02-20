import React, {useState} from 'react'
import { Button } from './Button'
import { ReactComponent as MyDocumentsIcon } from "../icons/file.svg"
import { ReactComponent as BrowseIcon } from "../icons/folder-open.svg"
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <>   
      <nav className={styles['Navbar']}>
          <div className={styles['navbar-container']}>
            <div className={styles['buttons-container']}>
              <Button 
                buttonStyle="icon-navbar-plain" 
                text="My Documents"
                icon={<MyDocumentsIcon className={styles['icon-navbar-plain-icon']} /> }
              />
              <Button 
                buttonStyle="icon-navbar-selected" 
                text="Browse"
                icon={<BrowseIcon className={styles['icon-navbar-selected-icon']} /> }
              />
            </div>
          </div>
      </nav>
    </>
  )
}

export default Navbar