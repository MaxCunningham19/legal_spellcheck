import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import { useDidMount } from '../hooks/useDidMount';
import styles from './MyDocuments.module.css';
import axios from 'axios';

export function MyDocuments() {

    const [documentsData, setDocumentsData] = useState([])
    const location = useLocation()
    const [currentDocument, setCurrentDocument] = useState({   
      title: "New document",
      blocks: [""]
    })
    const [validateAll, setValidateAll] = useState(false)

    useLayoutEffect(() => {
      axios
        .get("/api/document")
        .then((result) => {
          setDocumentsData(result.data)
        })
        .catch((error) => {})
    }, [])

    useEffect(() => {
      if( location.state !== null) {
        const { fromEditor } = location.state
        setCurrentDocument(fromEditor)
      }
    },[location.state])

    const handleOnValidateAll = () => {
      setValidateAll(true)
    }

    const generateExplorer = () => {
      return (
        <Explorer 
          className={styles['Explorer']}
          documentsData={documentsData}
        />
      )
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
            <Navbar 
              className={styles['Navbar']} 
              fromMyDocuments={currentDocument} 
            />
            {generateExplorer()}
          </div>
        </>
    );
}