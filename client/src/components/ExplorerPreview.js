import React, { useState } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'
import { Link } from 'react-router-dom'

export const ExplorerPreview = ({
  explorerData,
  onClickPreview
}) => {

  const generatePreviews = () => {
    return explorerData.map(document => (
      <Link to="/editor" state={{ fromMyDocuments: document }}>
        <PreviewIcon
          previewStyle="preview-icon-explorer"
          key={document.title}
          title={document.title}
          body={document.blocks[0].block_content}
          onClickPreview={onClickPreview}
        />
      </Link>
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