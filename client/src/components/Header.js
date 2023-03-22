import React, {useState, useRef, useEffect} from 'react'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { useDeleteMode, useDeleteModeUpdate} from '../hooks/DeleteModeContext'
import { Button } from './Button'
import axios from 'axios'
import styles from './Header.module.css'

export const TITLE_CHAR_LIMIT = 50

export const Header = ({ 
  headerTitle, 
  onValidateAll, 
  onSaveAll, 
  iconHeader
}) => {

  const document = useDocument()
  const updateDocument = useDocumentUpdate()
  const deleteMode = useDeleteMode()
  const updateDeleteMode = useDeleteModeUpdate()
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');
  const titleRef = useRef()

  const clickedSave = () => {
    onSaveAll()
    setSaved(true);
    setMessage('All changes saved!');
    setTimeout(() => {
      setSaved(false);
      setMessage('');
    }, 2000);
  };

  const handleOnKeyEnter = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
    } 
  } 

  const handleOnFocus = (e) => {
    // e.target.select()
  }

  const handleOnTitleBlur = (e, titleRef) => {
    const newTitle = titleRef.current.value
    if (newTitle === "") putTitle("Untitled document")
    if (document.title !== newTitle) putTitle(newTitle)
  }

  const putTitle = (newTitle) => {
    updateDocument((document) => ({...document, title: newTitle}))
    axios
      .put(`/api/document/${document.id}`, newTitle)
      .then((result) => { console.log(result) })
      .catch((error) => {}) 
  }

  const handleOnClickEdit = () => {
    updateDeleteMode()
  }

  return (
    <>
      <header className={styles['Header']}>
        <div className={styles['header-container']}>
          <div className={styles['title-container']}>
          { iconHeader
            ? <input 
                className={styles['title-input']}
                ref={titleRef}
                defaultValue={headerTitle}
                placeholder="Untitled document"
                maxlength={TITLE_CHAR_LIMIT}
                onFocus={(e) => handleOnFocus(e)}
                onBlur={(e) => handleOnTitleBlur(e, titleRef)}
                onKeyDown={(e) => handleOnKeyEnter(e)}
              />  
            : headerTitle
          }   
          </div>
          { iconHeader && 
              <>
                <div className={styles['icons-container']}>

                </div>
                <div className={styles['action-container']}>
                  <Button onClick={clickedSave} buttonStyle="actionbar-save" text="Save all"></Button>
                  <Button onClick={onValidateAll} buttonStyle="actionbar-validate" text="Validate all"></Button>
                </div>
              </>
          }
          { !iconHeader &&
              <>
                <div className={styles['action-container']}>
                  <Button 
                    onClick={handleOnClickEdit} 
                    buttonStyle={(deleteMode) ? "mydocuments-delete-cancel" : "mydocuments-delete-edit"} 
                    text={(deleteMode) ? "Cancel" : "Edit"}>
                  </Button>
                </div>
              </>
          }
        </div>
        {saved && <div className={styles['message']}>{message}</div>}      
      </header>
    </>
  )
}

export default Header