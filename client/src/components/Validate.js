import React, { useState } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'

//so far added changes in header with connection to api we can add changes here

//left this explorer preview as we might want to show it same way

export const ExplorerPreview = ({
  explorerData
}) => {

  const generatePreviews = () => {
    return explorerData.map(document => (
      <PreviewIcon
        previewStyle="preview-icon-explorer"
        key={document.documentId}
        title={document.title}
        body={document.paragraphs[0].content}
      />
    ))
  }

  return (
    <>
      <section className={styles['ExplorerPreview']}>
        <div className={styles['explorer-container']}>
          <Button 
            buttonStyle="icon-add-component-document" 
            icon={<PlusIcon className={styles['icon-add-component-document-icon']} />}
          />
          {generatePreviews()}
        </div>
      </section>
    </>
  )
}

export default ExplorerPreview