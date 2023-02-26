import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './Browse.module.css';
import documentsData from '../data/documentsData.json'

export function Browse() {

    return (
        <>
          <div className={styles['Browse']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header 
              className={styles['Header']}
              documentTitle={documentsData.documents[0].title}    // TODO: defaulted to 0
            />
            <Navbar className={styles['Navbar']}/>
            <Editor 
              className={styles['Editor']}
              document={documentsData.documents[0]}               // TODO: defaulted to 0
            />     
          </div>
        </>
    );
}