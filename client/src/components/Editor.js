import React, {useState} from 'react'
import { Button } from './Button'
import Carousel from './Carousel'
import styles from './Editor.module.css'
import documentData from '../data/documentsData.json' 

function Editor() {
  return (
    <>
      <section className={styles['Editor']}>
        <div className={styles['editor-container']}>
          <Carousel 
            className={styles['Carousel']} 
            data={documentData.documents[0]}    // TODO: defaulted to 0
          />
        </div>
      </section>
    </>
  )
}

export default Editor