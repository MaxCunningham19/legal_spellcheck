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

    const onSaveClick = (e, id) => {
      const newContent = textAreaRef.current.innerText
      if (uniqueid === undefined) postBlock(newContent)
      else putBlock(newContent)
    }

    const postBlock = (content) => {
      if (document.untracked) return
      const data = { block_content: content, block_order: id }
      axios
        .post(`/api/document/${document.id}`, content)
        .then((result) => { 
          console.log(result) 
          updateDocument((prevDocument) => ({
            ...prevDocument, 
            blocks: updateBlocks(prevDocument.blocks, result.id)
          }))
        })
        .catch((error) => {})
    }

    const putBlock = (content) => {
      console.log(content);
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
              {(onFocus) && (
                <Button 
                  buttonStyle="icon-single-textbox" 
                  onClick={(e) => onValidateClick(e, id)}
                  icon={<ValidateOutline className={styles['icon-single-textbox-icon-active']} />}
                />
              )}
              {(onFocus) && (
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