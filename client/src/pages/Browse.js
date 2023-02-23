import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Editor from '../components/Editor';
import styles from './Browse.module.css';

export function Browse() {

    return (
        <>
          <div className={styles['Browse']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <Header className={styles['Header']}/>
            <Navbar className={styles['Navbar']}/>
            <Editor className={styles['Editor']}/>
          </div>
        </>
    );
}