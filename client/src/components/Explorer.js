import React, { useState, useEffect } from 'react'
import { useExplorerView, useExplorerViewUpdate } from '../hooks/ExplorerViewContext'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { ExplorerPreview } from './ExplorerPreview'
import { ExplorerList } from './ExplorerList'
import { INCREMENT_API_PROMISE_LOADING } from '../index'
import styles from './Explorer.module.css'
import axios from 'axios'

export const Explorer = ({}) => {

  const iconView = useExplorerView()
  const updateView = useExplorerViewUpdate()
  const updateDocument = useDocumentUpdate()
  const [isLoading, setIsLoading] = useState(false)
 
  const handleOnClickDocument = (e, id, title) => {
    setIsLoading(() => true)
    axios
      .get(`/api/document/${id}`)
      .then((result) => {
        updateDocument({
          id: id,
          title: title, 
          blocks: parseBlocks(result.data), 
          untracked: false
        })
        setTimeout(() => {
          setIsLoading(() => false)
        }, INCREMENT_API_PROMISE_LOADING);
      })
      .catch((error) => {})
  }

  const parseBlocks = (result) => {
    const parsedBlocks = []
    result.map(block => {
      parsedBlocks.push(block)
    })
    return parsedBlocks
  }

  const handleOnClickCreate = () => {
    updateDocument({
      title: "",
      blocks: [{ block_content: "" }],
      untracked: true
    })
  }


  return (
    <>
      <section className={styles['Explorer']}>
        <div className={styles['explorer-container']}>
          { (iconView)
            ? <ExplorerPreview 
                onClickDocument={handleOnClickDocument}
                onClickCreate={handleOnClickCreate}
                isLoading={isLoading}
              />
            : <ExplorerList
                onClickDocument={handleOnClickDocument}
                onClickCreate={handleOnClickCreate}
                isLoading={isLoading}
              />
          }
        </div>
      </section>
    </>
  )
}

export default Explorer