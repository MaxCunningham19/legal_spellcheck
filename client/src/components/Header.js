import React, {useState} from 'react'
import { Button } from './Button'
import styles from './Header.module.css'


//creating my own constructor for now but should be passed from backend
class MyMistakes {
  constructor(word, start, end, suggestion) {
    this.word = word;
    this.start = start;
    this.end = end;
    this.suggestion = suggestion;
  }
}

//TODO: needs text to be added from api

function MyAllMistakes({ text, highlighted }) {
  const myArray = [];

  // create and push objects into the array
  myArray.push(new MyMistakes('amet', 23, 27, 'amat'));
  myArray.push(new MyMistakes('enim', 69, 73, 'ent'));

  const fragments = myArray.map(({ start, end }) => {
    return (
      <React.Fragment>
        {text.substring(0, start)}
        <span className="highlight">{text.substring(start, end)}</span>
        {text.substring(end, text.length)}
      </React.Fragment>
    );
  });

  return (
    <div>
      <div>{fragments}</div>
    </div>
  );
}


export const Header = ({ documentTitle, onValidateAll }) => {

  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');

  const clickedSave = () => {
    setSaved(true);
    setMessage('All changes saved!');
    setTimeout(() => {
      setSaved(false);
      setMessage('');
    }, 2000);
  };

  const clickedValidateAll = () => {
    onValidateAll();
  };

  return (
    <>
      <header className={styles['Header']}>
        <div className={styles['header-container']}>
          <div className={styles['title-container']}>
            {documentTitle}
          </div>
          <div className={styles['icons-container']}>

          </div>
          <div className={styles['action-container']}>
            <Button onClick={clickedSave} buttonStyle="actionbar-save" text="Save all"></Button>
            <Button onClick={clickedValidateAll}buttonStyle="actionbar-validate" text="Validate all"></Button>
          </div>
        </div>
        {saved && <div className={styles['message']}>{message}</div>}      
      </header>
    </>
  )
}

export default Header