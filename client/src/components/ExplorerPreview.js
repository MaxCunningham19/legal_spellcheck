import React, { useState, useEffect } from 'react'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'
import { Link, useNavigate } from 'react-router-dom'
import { INCREMENT_API_PROMISE_LOADING } from '../index'

export const ExplorerPreview = ({
  explorerData,
  onClickDocument,
  onClickCreate,
  isLoading
}) => {

  const navigate = useNavigate()

  function waitForLoading(e) {
    e.preventDefault()
    setTimeout(() => navigate("/editor"), INCREMENT_API_PROMISE_LOADING)
  }

  const generatePreviews = () => {
    return explorerData.map((document) => (
      <Link 
        to={"/editor"}
        className={styles['preview-link-a']}
        key={document.id}
        onClick={waitForLoading}
      >
        <PreviewIcon
          previewStyle="preview-icon-explorer"
          key={document.id} 
          id={document.id}
          title={document.title}
          onClickPreview={onClickDocument}
          isLoading={isLoading}
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
            className={styles['preview-link-a']}  
          >
            <Button 
              buttonStyle="icon-add-component-document" 
              icon={<PlusIcon className={styles['icon-add-component-document-icon']} />}
              onClick={onClickCreate}
            />
          </Link>
          {generatePreviews()}
        </div>
      </section>
    </>
  )
}

export default ExplorerPreview