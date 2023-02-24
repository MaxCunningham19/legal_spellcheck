import React, { useState } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'

export const ExplorerPreview = ({
  content
}) => {


  return (
    <>
      <section className={styles['ExplorerPreview']}>
        <div className={styles['explorer-container']}>
          <Button 
            buttonStyle="icon-add-document" 
            icon={<PlusIcon className={styles['icon-add-document-icon']} />}
          />
          {content}
        </div>
      </section>
    </>
  )
}

export default ExplorerPreview