import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import Editor from '../components/Editor';
import Header from '../components/Header'
import styles from './MyDocuments.module.css';
import mockAPIData from '../data/mockAPI.json';
import { Link } from "react-router-dom"
import axios from 'axios';
import { useDidMount } from '../hooks/useIsMount';

export function MyDocuments() {

    const [documentsData, setDocumentsData] = useState(mockAPIData.documents)
    const [clickedDocument, setClickedDocument] = useState(null)
    const [editorMode, setEditorMode] = useState(false)
    const didMount = useDidMount()

    useEffect(() => {
      getDocumentsData()
    },[])

    useEffect(() => {
      if (didMount) {
        setEditorMode(true)
      }
    }, [clickedDocument, didMount])

    const getDocumentsData = () => {
      axios
        .get("TODO: api/document")
        .then((result) => {
          // TODO: setDocumentsData(result)
        })
        .catch((error) => {})
    }

    const handleOnClickDocument = (e, title) => {
      axios
        .get(`TODO: api/document/${title}`)
        .then((result) => {
          // TODO: setClickedDocument(result)
        })
        .catch((error) => {})

      setClickedDocument(() => documentsData.find(
        doc => (doc.title === title)
      ))
    }

    return (
        <>
          <div className={styles['MyDocuments']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header 
              className={styles['Header']}
              headerTitle={(editorMode) ? clickedDocument.title : "My Documents"}
              iconHeader={(editorMode) ? true : false }
            />
            <Navbar className={styles['Navbar']}/>
            { editorMode 
              ?
                <Editor 
                  className={styles['Editor']}
                  document={clickedDocument}
                />
              : <Explorer 
                  className={styles['Explorer']}
                  documentsData={documentsData}
                  handleOnClickDocument={handleOnClickDocument}
                />
            }
          </div>
        </>
    );
}