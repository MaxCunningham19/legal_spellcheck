import React, { useState} from "react";
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './Browse.module.css';
import mockAPIData from '../data/mockAPI.json';

export function Browse() {

    const [documentsData, setDocumentsData] = useState(mockAPIData.documents)
    const [validateAll, setValidateAll] = useState(false)

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
              headerTitle={documentsData[0].title}    // TODO: defaulted to 0
              onValidateAll={handleOnValidateAll}
            />
            <Navbar className={styles['Navbar']}/>
            <Editor 
              className={styles['Editor']}
              document={documentsData[0]}               // TODO: defaulted to 0
              validateAll={validateAll}
            />     
          </div>
        </>
    );
}