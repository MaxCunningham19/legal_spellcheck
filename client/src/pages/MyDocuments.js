import Navbar from '../components/Navbar';
import IconExplorer from '../components/IconExplorer';
import styles from './MyDocuments.module.css';

export function MyDocuments() {

    return (
        <>
          <div className={styles['MyDocuments']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <div className={styles['page-title-container']}>My Documents</div>
            <Navbar className={styles['Navbar']}/>
            <IconExplorer className={styles['IconExplorer']}/>
          </div>
        </>
    );
}