import React, {useState, useRef, useEffect} from 'react'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { Button } from './Button'
import Carousel from './Carousel'
import axios from 'axios'
import styles from './Editor.module.css'

const END_BUTTON_CHILD = -1

export const Editor = ({ blocks, validateAll, saveAll }) => {

  const carouselRef = useRef(null)
  const updateDocument = useDocumentUpdate()
  const document = useDocument()
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if (saveAll) {
      updateBlocks()
      setUpdated(() => true)
    }
  }, [saveAll])

  useEffect(() => {
    if (updated) {
      (document.untracked)
      ? postDocument(document)
      : putDocument(document)
    }
  }, [document])

  const updateBlocks = () => {
    const children = [...carouselRef.current.children].slice(0, END_BUTTON_CHILD)
    const newBlocks = children.map((child, index) => {
      return child.innerText;
    })
    updateDocument((prevDocument) => ({ ...prevDocument, blocks: newBlocks }))
  }

  const postDocument = () => {
    const data = { documents: [document] }
    axios
      .post(`/api/documents/`, data)
      .then((result) => { console.log(result) })
      .catch((error) => {})
  }

  const putDocument = () => {
    const data = {
      title: document.title,
      blocks: document.blocks
    }
    axios
      .put(`/api/document/${document.id}`, data)
      .then((result) => { console.log(result) })
      .catch((error) => {})
  }

  return (
    <>
      <section className={styles['Editor']}>
        <div className={styles['editor-container']}>
          <Carousel 
            className={styles['Carousel']} 
            data={blocks}
            validateAll={validateAll}
            saveAll={saveAll}
            forwardedRef={carouselRef}
          />
        </div>
      </section>
    </>
  )
}

export default Editor