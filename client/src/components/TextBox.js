import React, { useState, useRef, useEffect } from 'react'
import { useDocument, useDocumentUpdate } from "../hooks/DocumentContext"
import { Button } from './Button'
import styles from './TextBox.module.css'
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import { ReactComponent as ValidateOutline } from "../icons/validate-outline.svg"
import { ReactComponent as Save } from "../icons/save.svg"
import { MistakeHighlighter } from './MistakeHighlighter'
import ReactLoading from 'react-loading'
import axios from 'axios'

export const TextBox = ({
    boxStyle,
    id,
    uniqueid,
    after,
    content,
    mistakes,
    onRemoveClick,
    onValidateClick,
    placeholder,
    validateAll
}) => {

    const document = useDocument()
    const updateDocument = useDocumentUpdate()
    
    const [isHovering, setIsHovering] = useState(false)
    const [onFocus, setOnFocus] = useState(false)
    const [isValidated, setIsValidated] = useState(false)
    const textAreaRef = useRef()
    const [uniqueId, setUniqueId] = useState("")
    const [loadValidate, setLoadValidate] = useState(false)
    const [loadSave, setLoadSave] = useState(false)

    useEffect(() => {
      setUniqueId(() => uniqueid)
    }, [uniqueid])

    const handleOnValidateClick = () => {
      onValidateClick()
      setLoadValidate(() => true)
      setTimeout(() => setLoadValidate(() => false), 3750)
      setTimeout(() => setIsValidated(() => true), 500)
    }

    const handleMouseOver = () => {
      setIsHovering(true)
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleOnFocus = () => {
      setOnFocus(true)
    }

    const handleOutOfFocus = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setOnFocus(false)
      }
    }

    /* Allows text to focus when pressing outside of editable span */
    const handleOnMouseDown = () => {
      textAreaRef.current && (
        setTimeout(function() { textAreaRef.current.focus() }, 0)
      )
    }

    const onSaveClick = (e, id) => {
      setLoadSave(() => true)
      setTimeout(() => setLoadSave(() => false), 1000)
      const newContent = textAreaRef.current.innerText
      if (uniqueId === undefined) postBlock(newContent)
      else putBlock(newContent)
    }

    const postBlock = (content) => {
      if (document.untracked) return
      if (after === -1) postAtBeginning(content)
      else postAfter(content)
    }

    const postAfter = (content) => {
      axios
        .post(`/api/blocks`, { 
          block_content: content, 
          block_order: {after: after},
          block_document: document.id
        })
        .then((result) => {
          setUniqueId(() => result.data.id)
        })
        .catch((error) => {})
    }

    const postAtBeginning = (content) => {
      axios
        .post(`/api/document/${document.id}/0`, content)
        .then((result) => {
          setUniqueId(() => result.data.id)
        })
        .catch((error) => {})
    }

    const putBlock = (content) => {
      axios
        .put(`/api/block/${uniqueid}`, { block_content: content })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {})
    }

    return (
      <>
        <div 
          className={styles['TextBox']}
          id={uniqueid}
          after={after}
          tabIndex={0}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleOnFocus}
          onMouseDown={handleOnMouseDown}
          onBlur={(e) => handleOutOfFocus(e)}
        >
          <div className={ onFocus ? styles[boxStyle + "-onfocus"] : styles[boxStyle]}>
            <div className={styles[boxStyle + "-text-container"]}>
              <span contentEditable
                suppressContentEditableWarning={true}
                spellCheck={false}
                className={styles['textarea']}    
                placeholder={placeholder}
                ref={textAreaRef}
              >
                { (isValidated || validateAll) && mistakes !== undefined
                  ? <MistakeHighlighter
                      text={content}
                      mistakes={mistakes}
                    />
                  : content
                }
              </span>
            </div>
            <div className={styles['icons-container']}>
              {(isHovering || onFocus) && (
                <Button 
                  buttonStyle="icon-single-textbox" 
                  onClick={(e) => onRemoveClick(e, id)}
                  icon={<CloseIcon className={styles['icon-single-textbox-icon-passive']}/>}
                />
              )}
              {(onFocus && !document.untracked) && (
                <Button 
                  buttonStyle="icon-single-textbox" 
                  onClick={(e) => handleOnValidateClick(e, uniqueid)}
                  icon={(!loadValidate) 
                    ? <ValidateOutline className={styles['icon-single-textbox-icon-active']}/> 
                    : <ReactLoading type={"spin"} color={"#F37A32"} height={"20px"} width={"20px"} />
                  }
                />
              )}
              {(onFocus && !document.untracked) && (
                <Button 
                  buttonStyle="icon-single-textbox" 
                  onClick={(e) => onSaveClick(e, id)}
                  icon={(!loadSave) 
                    ? <Save className={styles['icon-single-textbox-icon-passive']} />
                    : <ReactLoading type={"spin"} color={"#8BA3CC"} height={"20px"} width={"20px"} />
                  }
                />
              )}
            </div>
          </div>
        </div>
      </>
    )
}

export default TextBox