import React, {useState} from 'react'
import { Button } from './Button'
import Carousel from './Carousel'
import styles from './Editor.module.css'

export const Editor = ({ document }) => {

  return (
    <>
      <section className={styles['Editor']}>
        <div className={styles['editor-container']}>
          <Carousel 
            className={styles['Carousel']} 
            data={document.blocks}
          />
        </div>
      </section>
    </>
  )
}

export default Editor