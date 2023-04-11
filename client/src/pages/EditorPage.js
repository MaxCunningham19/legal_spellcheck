import React, { useState, useEffect, useRef} from "react";
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './EditorPage.module.css';
import axios from 'axios'

const END_BUTTON_CHILD = -1

export function EditorPage() {

    const document = useDocument()
    const updateDocument = useDocumentUpdate()

    const carouselRef = useRef(null)
    const [validateAll, setValidateAll] = useState(false)

    const handleOnValidateAll = () => {
      setTimeout(() => updateBlocks(), 500)
      setTimeout(() => checkDocument(), 1000)
      setTimeout(() => setValidateAll(true), 2500)
    }

    const handleOnValidateBlock = (e, id) => {
      setTimeout(() => updateBlocks(), 500)
      setTimeout(() => checkDocument(), 1000)
    }

    const handleOnSaveAll = () => {
      setTimeout(() => updateBlocks(), 500)
    }

    const updateBlocks = () => {
      const children = [...carouselRef.current.children].slice(0, END_BUTTON_CHILD)
      const newBlocks = mapInnerTextsToBlocks(children)
      const filtered = filterEmptyBlocks(newBlocks)
      const finalBlocks = updateBlockOrder(filtered)
      updateDocument((prevDocument) => { 
        let updatedDocument = {...prevDocument, blocks: finalBlocks}
        postOrPut(updatedDocument)
        updatedDocument = {...prevDocument, untracked: false}
        return updatedDocument
      })
    }

    const postOrPut = (document) => {
      if (document.untracked) postDocument(document)
      else putDocument(document)
    }

    const mapInnerTextsToBlocks = (children) => {
      return children.map((child, index) => {
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

    const postDocument = (document) => {
      const data = { documents: [{
        ...document, 
        title: (document.title !== "") ? document.title : "Untitled document",
        blocks: parseBlockContent(document.blocks)
      }] }
      axios
        .post(`/api/documents/`, data)
        .then((result) => { 
          updateDocument(() => result.data.documents[0]) 
        })
        .catch((error) => {})
    }

    const parseBlockContent = (unparsed) => {
      return unparsed.map((block) => {
        return block.block_content
      })
    }

    const putDocument = (document) => {
      const data = {
        title: (document.title !== "") ? document.title : "Untitled document",
        blocks: document.blocks
      }
      axios
        .put(`/api/document/${document.id}`, data)
        .then((result) => { 
          updateDocument(() => (result.data))    // TODO: solves DOM bug but breaks post untracked paragraphs
        })
        .catch((error) => {}) 
    }

    const checkDocument = () => {
      axios
        .get(`/api/check/document/${document.id}`)
        .then((result) => { 
          updateDocument((document) => ({
            ...document, mistakes: result.data, blocks: setMistakes(document.blocks, result.data)
          }))
        })
        .catch((error) => console.log(error))
    }

    const setMistakes = (blocks, mistakes) => {
      let newBlocks = []
      let block, mistake
      for (let b = 0; b < blocks.length; b++) {
        block = blocks[b]
        for (let m = 0; m < mistakes.length; m++) {
          mistake = mistakes[m]
          if (block.block_order === mistake.block_order) {
            newBlocks.push({...block, mistakes: mistake.mistakes })
            break
          }
        }
      }
      return newBlocks
    }

    return (
        <>
          <div className={styles['Browse']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header 
              className={styles['Header']}
              iconHeader={true}
              headerTitle={document.title}
              onValidateAll={handleOnValidateAll}
              onSaveAll={handleOnSaveAll}
            />
            <Navbar 
              className={styles['Navbar']} 
            />
            <Editor 
              className={styles['Editor']}
              blocks={document.blocks}
              onValidateClick={handleOnValidateBlock}
              forwardedRef={carouselRef}
              validateAll={validateAll}
            /> 
          </div>
        </>
    );
}