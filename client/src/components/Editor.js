import React, {useState, useRef, useEffect} from 'react'
import Carousel from './Carousel'
import axios from 'axios'
import styles from './Editor.module.css'
import { SideMistakeBar } from './SideMistakeBar'

export const Editor = ({ blocks, onValidateClick, forwardedRef, validateAll }) => {

  const [isCompact, setIsCompact] = useState(false)
  const [showMistakeBar, setShowMistakeBar] = useState(false)

  useEffect(() => {
    if (validateAll === true) setTimeout(() => setShowMistakeBar(true), 1500)
  }, [validateAll])

  const toggleMode = () => {
    setIsCompact(() => !isCompact);
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
          { (showMistakeBar) &&
            <SideMistakeBar
              className={styles['SideMistakeBar']}
              isCompact={isCompact}
              toggleMode={toggleMode}
            /> 
          }
        </div>
      </section>
    </>
  )
}

export default Editor