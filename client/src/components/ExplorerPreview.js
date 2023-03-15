import React, { useState, useEffect } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'
import { Link } from 'react-router-dom'

export const ExplorerPreview = ({
  explorerData
}) => {

  const generatePreviews = () => {
    return explorerData.map((document) => (
      <Link to="/editor" state={{ fromMyDocuments: document }}>
        <PreviewIcon
          previewStyle="preview-icon-explorer"
          key={document.id} 
          id={document.id}
          title={document.title}
        />
      </Link>
    ))
  }

  return (
    <>
      <section className={styles['ExplorerPreview']}>
        <div className={styles['explorer-container']}>
          <Link 
            to="/editor"
            state={{ fromMyDocuments: { 
              title: "New document",
              blocks: [""] 
            } }}  
          >
            <Button 
              buttonStyle="icon-add-component-document" 
              icon={<PlusIcon className={styles['icon-add-component-document-icon']} />}
            />
          </Link>
          {generatePreviews()}
        </div>
      </section>
    </>
  )
}

export default ExplorerPreview