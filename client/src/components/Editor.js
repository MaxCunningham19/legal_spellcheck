import React, {useState, useRef, useEffect} from 'react'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { Button } from './Button'
import Carousel from './Carousel'
import axios from 'axios'
import styles from './Editor.module.css'
import { SideMistakeBar } from './SideMistakeBar'

export const Editor = ({ blocks, forwardedRef, validateAll }) => {

  const [showMistakeBar, setShowMistakeBar] = useState(false);

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
            validateAll={validateAll}
            forwardedRef={forwardedRef}
          />
          { validateAll &&
            <button 
              className={(showMistakeBar) ? styles["buttonShifted"] : styles["button"]} 
              onClick={toggleMistakeBar}
            >
            {showMistakeBar ? '>>' : '<<'}
            </button>
          }
          { showMistakeBar &&
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