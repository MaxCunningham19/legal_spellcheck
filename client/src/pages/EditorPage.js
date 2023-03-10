import React, { useState, useEffect, useRef} from "react";
import { useDidMount } from '../hooks/useDidMount'
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './EditorPage.module.css';
import mockAPIData from '../data/mockAPI.json';

export function EditorPage() {

    const [validateAll, setValidateAll] = useState(false)
    const location = useLocation()
    const [documentsData, setDocumentsData] = useState(mockAPIData.documents)
    const [currentDocument, setCurrentDocument] = useState(documentsData[0])
    const didMount = useDidMount()

    useEffect(() => {
      if( location.state !== null) {
        const { fromMyDocuments } = location.state
        setCurrentDocument(fromMyDocuments)
      }
    },[location.state])


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