import React, {useState} from 'react'
import { Button } from './Button'
import Carousel from './Carousel'
import styles from './Editor.module.css'
import documentData from '../data/documentsData.json' 

export const Editor = ({ document }) => {

  console.log(document);

  return (
    <>
      <section className={styles['Editor']}>
        <div className={styles['editor-container']}>
          <Carousel 
            className={styles['Carousel']} 
            data={document.paragraphs}
          />
        </div>
      </section>
    </>
  )
}

export default Editor