import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import styles from './MyDocuments.module.css';
import mockAPIData from '../data/mockAPI.json';
import { Link } from "react-router-dom"
import axios from 'axios';
import { useDidMount } from '../hooks/useIsMount';

export function MyDocuments() {

    const [documentsData, setDocumentsData] = useState(mockAPIData.documents)
    const location = useLocation()
    const [clickedDocument, setClickedDocument] = useState(null)
    const [currentDocument, setCurrentDocument] = useState(documentsData[0])
    const [validateAll, setValidateAll] = useState(false)

    useEffect(() => {
      getDocumentsData()
    },[])

    useEffect(() => {
      if( location.state !== null) {
        const { fromEditor } = location.state
        setCurrentDocument(fromEditor)
      }
    },[location.state])

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

    const handleOnValidateAll = () => {
      setValidateAll(true)
    }

    return (
        <>
          <div className={styles['MyDocuments']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header 
              className={styles['Header']}
              headerTitle={"My Documents"}
              iconHeader={false}
              onValidateAll={handleOnValidateAll}
            />
            <Navbar className={styles['Navbar']} fromMyDocuments={currentDocument} />
            {
              /*
                <Editor 
                  className={styles['Editor']}
                  document={clickedDocument}
                  validateAll={validateAll}
                />
              */
            }
            <Explorer 
              className={styles['Explorer']}
              documentsData={documentsData}
              handleOnClickDocument={handleOnClickDocument}
            />
          </div>
        </>
    );
}