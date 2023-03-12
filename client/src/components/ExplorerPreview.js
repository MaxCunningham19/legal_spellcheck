import React, { useState, useEffect } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'
import { Link } from 'react-router-dom'

export const ExplorerPreview = ({
  explorerData,
  onClickPreview,
  onClickAdd
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
          <Link 
            to="/editor" 
            state={{ fromMyDocuments: {
              title: "New document", created_at: "", updated_at: "",
              blocks: [
                {
                  block_content: "",
                  block_order: 0
                }
              ]
            }}} 
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