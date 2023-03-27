import React, {useState, useRef, useEffect} from 'react'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { Button } from './Button'
import Carousel from './Carousel'
import axios from 'axios'
import styles from './Editor.module.css'

export const Editor = ({ blocks, onValidateClick, forwardedRef, validateAll }) => {

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
        </div>
      </section>
    </>
  )
}

export default Editor