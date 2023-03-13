import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import { useDidMount } from '../hooks/useDidMount';
import styles from './MyDocuments.module.css';
import mockAPIData from '../data/mockAPI.json';
import { Link } from "react-router-dom"
import axios from 'axios';

export function MyDocuments() {

    const [documentsData, setDocumentsData] = useState([])

    const location = useLocation()
    const [clickedDocument, setClickedDocument] = useState({})
    const [currentDocument, setCurrentDocument] = useState(documentsData[0])
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

    const createNewDocument = () => {
      const newDocument = {
        title: "New document", created_at: "", updated_at: "",
          blocks: [
            {
              block_content: "",
              block_order: 0
            }
          ]
      }
      setDocumentsData(prevDocumentsData => [...prevDocumentsData, newDocument])
    }


    const generateExplorer = () => {
      return (
        <Explorer 
          className={styles['Explorer']}
          documentsData={documentsData}
          handleOnClickDocument={handleOnClickDocument}
          handleOnClickAdd={createNewDocument}
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