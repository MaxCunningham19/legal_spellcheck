import React, {useState, useRef, useEffect} from 'react'
import { useExplorerView, useExplorerViewUpdate } from '../hooks/ExplorerViewContext'
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'
import { useDeleteMode, useDeleteModeUpdate} from '../hooks/DeleteModeContext'
import { Button } from './Button'
import axios from 'axios'
import styles from './Header.module.css'
import { LoadingMessage } from './LoadingMessage'
import { ReactComponent as GridView} from '../icons/grid-view.svg'
import { ReactComponent as ListView} from '../icons/list-view.svg'

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
  const iconView = useExplorerView()
  const updateExplorerView = useExplorerViewUpdate()

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const titleRef = useRef()

  const setLoadingMessage = (message, timeout) => {
    setSaving(true);
    setMessage(message);
    setTimeout(() => {
      setSaving(false);
      setMessage('');
    }, timeout);
  }

  const handleOnClickSaveAll = () => {
    onSaveAll()
    setLoadingMessage("Saving document", 1000)   
  };

  const handleOnClickValidateAll = () => {
    onValidateAll()
    setLoadingMessage("Running spellcheck", 3500)
  }

  const handleOnKeyEnter = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
    } 
  } 

  const handleOnFocus = (e) => {
    // e.target.select()
  }

  const handleOnTitleBlur = (e, titleRef) => {
    setLoadingMessage("Updating title", 1000)
    const newTitle = titleRef.current.value
    if (newTitle === "") putTitle("Untitled document")
    if (document.title !== newTitle) putTitle(newTitle)
  }

  const putTitle = (newTitle) => {
    updateDocument((document) => ({...document, title: newTitle}))
    axios
      .put(`/api/document/${document.id}`, {title: newTitle})
      .then((result) => { 
        console.log(result) 

      })
      .catch((error) => {}) 
  }

  const handleOnClickEdit = () => {
    updateDeleteMode()
  }

  const handleOnClickChangeView = () => {
    updateExplorerView()
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
                { saving && 
                  <LoadingMessage
                    type="spin"
                    color="#8BA3CC"
                    percWidth="7%"
                    percHeight="7%"
                    message={message}
                    messageStyle="header-loading" 
                  />
                }
                </div>
                <div className={styles['action-container']}>
                  <Button onClick={handleOnClickSaveAll} buttonStyle="actionbar-save" text="Save All"></Button>
                  <Button onClick={handleOnClickValidateAll} buttonStyle="actionbar-validate" text="Spellcheck"></Button>
                </div>
              </>
          }
          { !iconHeader &&
              <>
                <div className={styles['action-container-mydocuments']}>
                  <Button 
                    onClick={handleOnClickChangeView} 
                    buttonStyle={"icon-header-view"} 
                    text={"View"}
                    icon={
                      (iconView) 
                      ? <GridView className={styles["icon-header-view-icon"]}/> 
                      : <ListView className={styles["icon-header-view-icon"]} />
                    }
                  >  
                  </Button>
                  <Button 
                    onClick={handleOnClickEdit} 
                    buttonStyle={(deleteMode) ? "mydocuments-delete-cancel" : "mydocuments-delete-edit"} 
                    text={(deleteMode) ? "Cancel" : "Edit"}>
                  </Button>
                </div>
              </>
          }
        </div>
      </header>
    </>
  )
}

export default Header