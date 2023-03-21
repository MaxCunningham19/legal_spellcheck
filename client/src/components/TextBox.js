import React, { useState, useRef, useEffect } from 'react'
import { Button } from './Button'
import styles from './TextBox.module.css'
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import { ReactComponent as ValidateOutline } from "../icons/validate-outline.svg"
import { ReactComponent as Save } from "../icons/save.svg"
import { MistakeHighlighter } from './MistakeHighlighter'

export const TextBox = ({
    boxStyle,
    id,
    uniqueid,
    content,
    onChangeInput,
    onRemoveClick,
    onSaveClick,
    onValidateClick,
    placeholder,
    validate,
    save,
    forwardedRef
}) => {
    
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

    const handleOutOfFocus = () => {
      setOnFocus(false)
    }

    return (
      <>
        <div 
          className={styles['TextBox']}
          id={uniqueid}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleOnFocus}
          onBlur={handleOutOfFocus}
        >
          <div className={ onFocus ? styles[boxStyle + "-onfocus"] : styles[boxStyle]}>
            <div className={styles[boxStyle + "-text-container"]}>
              <span contentEditable
                suppressContentEditableWarning={true}
                className={styles['textarea']}    
                placeholder={placeholder}
                ref={forwardedRef}
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