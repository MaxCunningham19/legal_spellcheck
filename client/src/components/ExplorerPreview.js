import React, { useState, useEffect } from 'react'
import { useDeleteMode, useDeleteModeUpdate } from '../hooks/DeleteModeContext'
import styles from './ExplorerPreview.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'
import { ReactComponent as MinusIcon } from "../icons/minus-circle.svg"
import { Link, useNavigate } from 'react-router-dom'
import { INCREMENT_API_PROMISE_LOADING } from '../index'
import axios from 'axios'

export const ExplorerPreview = ({
  explorerData,
  onClickDocument,
  onClickCreate,
  isLoading
}) => {

  const deleteMode = useDeleteMode()
  const navigate = useNavigate()
  const [documents, setDocuments] = useState(explorerData)

  useEffect(() => {
    setDocuments(() => explorerData)
  }, [explorerData])

  function waitForLoading(e) {
    e.preventDefault()
    setTimeout(() => navigate("/editor"), INCREMENT_API_PROMISE_LOADING)
  }

  function deleteDocument(e, id) {
    setDocuments((prevDocuments) => prevDocuments.filter((document) => document.id !== id))
    axios
      .delete(`/api/document/${id}`)
      .then((result) => console.log(result))
      .catch((error) => {})
  }

  const generatePreviews = () => {
    sortByCreated()
    return documents.map((document) => (
      <div className={styles["preview-icon-container"]}>
        <div className={styles["minus-icon-container"]}>
            { (deleteMode) && 
              <Button 
                buttonStyle="icon-minus-mydocuments" 
                onClick={(e) => deleteDocument(e, document.id)}
                icon={<MinusIcon className={styles["icon-minus-mydocuments-icon"]} /> } 
              />           
            }
        </div>
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
      </div>
    ))
  }

  const sortByCreated = () => {
    documents.sort(function(a, b) {
      return new Date(a.created_at) - new Date(b.created_at);  
    })
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