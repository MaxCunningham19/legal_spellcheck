import React, {useState} from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'

function Carousel() {
  return (
    <>
      <section className={styles['Carousel']}>
        <div className={styles['carousel-container']}>
          <TextBox type="paragraph-text-box" />
          <TextBox type="paragraph-text-box" />
        </div>
      </section>
    </>
  )
}

export default Carousel