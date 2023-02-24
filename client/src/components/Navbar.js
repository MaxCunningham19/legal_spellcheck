import React, {useState} from 'react'
import { Button } from './Button'
import { ReactComponent as MyDocumentsIcon } from "../icons/file.svg"
import { ReactComponent as BrowseIcon } from "../icons/folder-open.svg"
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {

  return (
    <>   
      <nav className={styles['Navbar']}>
          <div className={styles['navbar-container']}>
            <div className={styles['buttons-container']}>
              <NavLink to="/my-documents">
                {({ isActive }) => 
                  <Button 
                    buttonStyle={isActive ? "icon-navbar-selected" : "icon-navbar-plain"} 
                    text="My Documents"
                    icon={<MyDocumentsIcon 
                      className={styles[isActive ? 'icon-navbar-selected-icon' : 'icon-navbar-plain-icon']} /> 
                    }
                  />
                }
              </NavLink>
              <NavLink to="/">
                {({ isActive }) => 
                  <Button 
                    buttonStyle={isActive ? "icon-navbar-selected" : "icon-navbar-plain"} 
                    text="Browse"
                    icon={<BrowseIcon 
                      className={styles[isActive ? 'icon-navbar-selected-icon' : 'icon-navbar-plain-icon']} /> 
                    }
                  />
                }
              </NavLink>
            </div>
          </div>
      </nav>
    </>
  )
}

export default Navbar