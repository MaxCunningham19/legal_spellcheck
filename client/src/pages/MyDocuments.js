import Navbar from '../components/Navbar';
import Explorer from '../components/Explorer';
import styles from './MyDocuments.module.css';

export function MyDocuments() {

    return (
        <>
          <div className={styles['MyDocuments']}>
            <div className={styles['title']}>LEGAL SPELL CHECK</div>
            <div className={styles['page-title-container']}>My Documents</div>
            <Navbar className={styles['Navbar']}/>
            <Explorer className={styles['Explorer']}/>
          </div>
        </>
    );
}