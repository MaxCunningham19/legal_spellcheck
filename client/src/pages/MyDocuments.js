import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './MyDocuments.module.css';

export function MyDocuments() {

    return (
        <>
          <div className={styles['MyDocuments']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header className={styles['Header']}/>
            <Navbar className={styles['Navbar']}/>
            <Editor className={styles['Editor']}/>
          </div>
        </>
    );
}