import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { DeleteModeProvider } from '../hooks/DeleteModeContext';
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext';
import { useDocumentList, useDocumentListUpdate } from '../hooks/DocumentListContext'
import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import Header from '../components/Header'
import styles from './MyDocuments.module.css';
import axios from 'axios';

export function MyDocuments() {

    const [validateAll, setValidateAll] = useState(false)
    const updateDocumentList = useDocumentListUpdate()

    useLayoutEffect(() => {
      axios
        .get("/api/document")
        .then((result) => {
          updateDocumentList(result.data)
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