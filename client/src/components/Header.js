import React, {useState} from 'react'
import { Button } from './Button'
import styles from './Header.module.css'

function Header() {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');

  const clickedSave = () => {
    setSaved(true);
    setMessage('All changes saved!');
    setTimeout(() => {
      setSaved(false);
      setMessage('');
    }, 2000);
  };

  return (
    <>
      <header className={styles['Header']}>
        <div className={styles['header-container']}>
          <div className={styles['empty-container']}>

          </div>
          <div className={styles['icons-container']}>

          </div>
          <div className={styles['action-container']}>
            <Button onClick={clickedSave} buttonStyle="actionbar-save" text="Save all"></Button>
            <Button buttonStyle="actionbar-validate" text="Validate all"></Button>
          </div>
        </div>
        {saved && <div className={styles['message']}>{message}</div>}      
      </header>
    </>
  )
}

export default Header