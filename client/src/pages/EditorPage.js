import React, { useState, useEffect, useRef} from "react";
import { useDidMount } from '../hooks/useDidMount'
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './EditorPage.module.css';
import axios from 'axios'

export function EditorPage() {

    const [validateAll, setValidateAll] = useState(false)
    const location = useLocation()
    const [currentDocument, setCurrentDocument] = useState({   
      title: "New document",
      blocks: [""]
    })
    const didMount = useDidMount()

    useEffect(() => {
      if( location.state !== null) {
        const { fromMyDocuments } = location.state
        fetchDocumentBlocks(fromMyDocuments)
      }
    },[location.state])

    const fetchDocumentBlocks = (document) => {
      axios
        .get(`/api/document/${document.id}`)
        .then((result) => {
          setCurrentDocument(prevDocument => ({
            ...prevDocument, title: document.title, blocks: parseBlocks(result.data)
          }))
        })
        .catch((error) => { setCurrentDocument(prevDocument => ({
          ...prevDocument, title: document.title, blocks: document.blocks
        }))})
    }

    const parseBlocks = (result) => {
      const parsedBlocks = []
      result.map(block => {
        parsedBlocks.push(block.block_content)
      })
      return parsedBlocks
    }

    const handleOnValidateAll = () => {
      setValidateAll(true)
    }

    return (
        <>
          <div className={styles['Browse']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header 
              className={styles['Header']}
              iconHeader={true}
              headerTitle={currentDocument.title}
              onValidateAll={handleOnValidateAll}
            />
            { didMount &&
              <>
                <Navbar 
                  className={styles['Navbar']} 
                  fromEditor={currentDocument} 
                />
                <Editor 
                  className={styles['Editor']}
                  blocks={currentDocument.blocks}
                  validateAll={validateAll}
                />
              </> 
            }    
          </div>
        </>
    );
}