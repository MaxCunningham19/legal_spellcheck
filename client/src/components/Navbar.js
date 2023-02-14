import React, {useState} from 'react'
import { Button, ButtonGroup } from "./Button";
import { Button2 } from './Button'
import styles from './Navbar.module.css'
import "rsuite/dist/rsuite.min.css";


function sayHello() {
  alert('You clicked me!');
}

function Navbar() {
  return (
    <>   
        <nav className={styles['Navbar']}>
            <div className={styles['navbar-container']}>
               <Button color="cyan" appearance="primary" block="true">My Documents </Button> 

              
            </div>
        </nav>
    </>
  )
}

<Button onClick={sayHello}>Default</Button>


export default Navbar