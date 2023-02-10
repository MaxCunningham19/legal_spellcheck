import React from 'react'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Editor from './components/Editor';
import styles from './App.module.css';

function App() {

  return (
    <>
      <div className={styles['App']}>
        <div className={styles['title']}>LEGAL SPELL CHECK</div>
        <Header className={styles['Header']}/>
        <Navbar className={styles['Navbar']}/>
        <Editor className={styles['Editor']}/>
      </div>
    </>
  );

}

export default App;
