import React, { useState } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'

export const ExplorerPreview = ({
  explorerData
}) => {

  const generatePreviews = () => {
    return explorerData.map(document => (
      <PreviewIcon
        previewStyle="preview-icon-default"
        key={document.documentId}
        title={document.title}
        body="TODO:"
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