import React, { useState, useEffect, useRef} from "react";
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './EditorPage.module.css';
import axios from 'axios'

export function EditorPage() {

    const document = useDocument()

    const [validateAll, setValidateAll] = useState(false)
    const [saveAll, setSaveAll] = useState(false)

    const handleOnValidateAll = () => {
      setValidateAll(true)
    }

    const handleOnSaveAll = () => {
      setSaveAll(true)
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
              validateAll={validateAll}
              saveAll={saveAll}
            /> 
          </div>
        </>
    );
}