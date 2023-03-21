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
    const newBlocks = mapInnerTextsToBlocks(children)
    const filtered = filterEmptyBlocks(newBlocks)
    const finalBlocks = updateBlockOrder(filtered)
    updateDocument((prevDocument) => ({ 
      ...prevDocument, 
      blocks: finalBlocks
    }))
  }

  const mapInnerTextsToBlocks = (children) => {
    return children.map((child, index) => {
      console.log(child.id + " " + child.innerText);
      if (child.innerText != "") return { 
        id: (child.id != "") ? child.id : undefined,
        block_content: child.innerText,
        block_order: index
      }
    })
  }

  const filterEmptyBlocks = (newBlocks) => {
    return newBlocks.filter((block) => {
      return block !== undefined
    })
  }

  const updateBlockOrder = (filtered) => {
    return filtered.map((block, index) => (
      { ...block, block_order: index })
    )
  }

  const postDocument = () => {
    console.log(document);
    const data = { documents: [
      {...document, blocks: parseBlockContent(document.blocks)}
    ] }
    axios
      .post(`/api/documents/`, data)
      .then((result) => { console.log(result) })
      .catch((error) => {})
  }

  const parseBlockContent = (unparsed) => {
    return unparsed.map((block) => {
      return block.block_content
    })
  }

  const putDocument = () => {
    console.log(document);
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