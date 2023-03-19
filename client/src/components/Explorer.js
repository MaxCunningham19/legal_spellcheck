import React, { useState, useEffect } from 'react'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { ExplorerPreview } from './ExplorerPreview'
import styles from './ExplorerPreview.module.css'
import axios from 'axios'
import { INCREMENT_API_PROMISE_LOADING } from '../index'
// TODO: import { ExplorerList } from './ExplorerList'

export const Explorer = ({
  documentsData
}) => {

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
      parsedBlocks.push(block.block_content)
    })
    return parsedBlocks
  }

  const handleOnClickCreate = () => {
    updateDocument({
      title: "New document",
      blocks: [""],
      untracked: true
    })
  }


  return (
    <>
      <section className={styles['Explorer']}>
        <div className={styles['explorer-container']}>
          <ExplorerPreview 
            explorerData={documentsData}
            onClickDocument={handleOnClickDocument}
            onClickCreate={handleOnClickCreate}
            isLoading={isLoading}
          />
          {/*TODO: ExplorerPreview can then be swapped to ExplorerList*/}
        </div>
      </section>
    </>
  )
}

export default Explorer