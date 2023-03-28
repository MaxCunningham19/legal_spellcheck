import React, {useState, useRef, useEffect} from 'react'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { Button } from './Button'
import Carousel from './Carousel'
import axios from 'axios'
import styles from './Editor.module.css'
import { SideMistakeBar } from './SideMistakeBar'

export const Editor = ({ blocks, onValidateClick, forwardedRef, validateAll }) => {

  const [showMistakeBar, setShowMistakeBar] = useState(false);

  useEffect(() => {
    if (validateAll === true) setShowMistakeBar(true)
  }, [validateAll])

  const toggleMistakeBar = () => {
    setShowMistakeBar(() => !showMistakeBar);
  }

  return (
    <>
      <section className={styles['Editor']}>
        <div className={styles['editor-container']}>
          <Carousel 
            className={styles['Carousel']} 
            data={blocks}
            onValidateClick={onValidateClick}
            forwardedRef={forwardedRef}
            validateAll={validateAll}
          />
          { validateAll &&
            <button 
              className={(showMistakeBar) ? styles["buttonShifted"] : styles["button"]} 
              onClick={toggleMistakeBar}
            >
            {showMistakeBar ? '>>' : '<<'}
            </button>
          }
          { (showMistakeBar) &&
            <SideMistakeBar
              className={styles['SideMistakeBar']}
            /> 
          }
        </div>
      </section>
    </>
  )
}

export default Editor