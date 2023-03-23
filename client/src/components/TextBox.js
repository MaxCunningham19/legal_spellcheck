import React, { useState, useRef, useEffect } from 'react'
import { useDocument, useDocumentUpdate } from "../hooks/DocumentContext"
import { Button } from './Button'
import styles from './TextBox.module.css'
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import { ReactComponent as ValidateOutline } from "../icons/validate-outline.svg"
import { ReactComponent as Save } from "../icons/save.svg"
import { MistakeHighlighter } from './MistakeHighlighter'
import axios from 'axios'

export const TextBox = ({
    boxStyle,
    id,
    uniqueid,
    content,
    onChangeInput,
    onRemoveClick,
    onValidateClick,
    placeholder,
    validate,
    save,
    forwardedRef
}) => {

    const document = useDocument()
    const updateDocument = useDocumentUpdate()
    
    const [isHovering, setIsHovering] = useState(false)
    const [onFocus, setOnFocus] = useState(false)
    const [isSaved, setIsSaved] = useState(save)
    const [isValidated, setIsValidated] = useState(validate)
    const textAreaRef = useRef()
    
    useEffect(() => {
      setIsValidated(() => validate)
    },[validate])

    useEffect(() => {
      setIsSaved(() => save)
    },[save])

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
      const newContent = textAreaRef.current.innerText
      if (uniqueid === undefined) postBlock(newContent)
      else putBlock(newContent)
    }

    const postBlock = (content) => {                  // TODO: figuring out what's the best/safest way to do this
      /** if (document.untracked) return
      axios
        .post(`/api/block/`, { block_content: content })
        .then((result) => { 
          console.log(result) 
          updateDocument((prevDocument) => ({
            ...prevDocument, 
            blocks: updateBlocks(prevDocument.blocks, result.id)
        })) 
        })
        .catch((error) => {})
       */
    }

    const putBlock = (content) => {
      axios
        .put(`/api/block/${uniqueid}`, { block_content: content })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {})
    }

    const updateBlocks = (prevBlocks, id) => {
      return prevBlocks.map((block) => {/* update unique id */})
    }

    return (
      <>
        <div 
          className={styles['TextBox']}
          id={uniqueid}
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
                className={styles['textarea']}    
                placeholder={placeholder}
                ref={textAreaRef}
                onInput={(e) => {onChangeInput(e, id)}}
              >
                { isValidated
                  ? <MistakeHighlighter
                      text={content}
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
                  onClick={(e) => onValidateClick(e, id)}
                  icon={<ValidateOutline className={styles['icon-single-textbox-icon-active']} />}
                />
              )}
              {(onFocus && !document.untracked) && (
                <Button 
                  buttonStyle="icon-single-textbox" 
                  onClick={(e) => onSaveClick(e, id)}
                  icon={<Save className={styles['icon-single-textbox-icon-passive']} />}
                />
              )}
            </div>
          </div>
        </div>
      </>
    )
}

export default TextBox