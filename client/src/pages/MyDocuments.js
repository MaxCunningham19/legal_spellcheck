import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext';
import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import Header from '../components/Header'
import styles from './MyDocuments.module.css';
import axios from 'axios';
import { DeleteModeProvider } from '../hooks/DeleteModeContext';

export function MyDocuments() {

    const [documentsData, setDocumentsData] = useState([])
    const [validateAll, setValidateAll] = useState(false)

    useLayoutEffect(() => {
      axios
        .get("/api/document")
        .then((result) => {
          setDocumentsData(result.data)
        })
        .catch((error) => {})
    }, [])

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
          <DeleteModeProvider>
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
              />
              {generateExplorer()}
            </div>
          </DeleteModeProvider>
          
        </>
    );
}