import React, { useState, useEffect } from 'react'
import { useDeleteMode, useDeleteModeUpdate } from '../hooks/DeleteModeContext'
import { useDocumentList, useDocumentListUpdate } from '../hooks/DocumentListContext'
import { ListIcon } from './ListIcon'
import { Button } from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { ReactComponent as MinusIcon } from "../icons/minus-circle.svg"
import { INCREMENT_API_PROMISE_LOADING } from '../index'
import axios from 'axios'
import styles from './ExplorerList.module.css'

export const ExplorerList = ({
  onClickDocument,
  onClickCreate,
  isLoading
}) => {

  const deleteMode = useDeleteMode()
  const navigate = useNavigate()
  const documentList = useDocumentList()
  const updateList = useDocumentListUpdate()

  function waitForLoading(e) {
    e.preventDefault()
    setTimeout(() => navigate("/editor"), INCREMENT_API_PROMISE_LOADING)
  }

  function deleteDocument(e, id) {
    updateList((prevDocuments) => prevDocuments.filter((document) => document.id !== id))
    axios
      .delete(`/api/document/${id}`)
      .then((result) => console.log(result))
      .catch((error) => {})
  }

  const generateList = () => {
    sortByCreated()
    return documentList.map((document) => (
      <>
        <div className={styles["list-item-container"]}>
        {<div className={styles["minus-icon-container"]}>
            { (deleteMode) && 
              <Button 
                buttonStyle="icon-minus-mydocuments-list" 
                onClick={(e) => deleteDocument(e, document.id)}
                icon={<MinusIcon className={styles["icon-minus-mydocuments-list-icon"]} /> } 
              />           
            }
        </div>}
        <Link 
          to={"/editor"}
          className={styles['preview-link-a']}
          key={document.id}
          onClick={waitForLoading}
        >
          <ListIcon
            rowStyle="list-row-explorer"
            key={document.id} 
            id={document.id}
            title={document.title}
            created={document.created_at.substr(0, 10)}
            updated={document.updated_at.substr(0, 10)}
            onClickRow={onClickDocument}
            isLoading={isLoading}
          />
        </Link>
        </div>
      </>
    ))
  }

  const sortByCreated = () => {
    documentList.sort(function(a, b) {
      return new Date(a.created_at) - new Date(b.created_at);  
    })
  }

  return (
    <>
      <section className={styles['ExplorerList']}>
        <div className={styles['explorer-container']}>
          <div className={styles['list-header-container']}>
            <span className={styles['title-header']}>Title</span>
            <span className={styles['created-header']}>Date Created</span>
            <span className={styles['updated-header']}>Date Modified</span>
          </div>
          <div className={styles['list-rows-container']}>
            {generateList()}
          </div>
          {/* <Link 
            to="/editor"
            className={styles['preview-link-a']}  
          >
            <Button 
              buttonStyle="icon-add-component-document" 
              icon={<PlusIcon className={styles['icon-add-component-document-icon']} />}
              onClick={onClickCreate}
            />
          </Link>
          {generatePreviews()}  */}
        </div>
      </section>
    </>
  )
}

export default ExplorerList 