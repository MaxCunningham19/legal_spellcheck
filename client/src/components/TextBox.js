import React, { useState, useRef, useEffect } from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'
import { Button } from './Button'
import styles from './TextBox.module.css'
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import { MistakeHighlighter } from './MistakeHighlighter'

export const TextBox = ({
    boxStyle,
    id,
    content,
    onChangeInput,
    onRemoveClick,
    placeHolder,
    validate
}) => {

    
    const [isHovering, setIsHovering] = useState(false)
    const [onFocus, setOnFocus] = useState(false)
    const textAreaRef = useRef()
    
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
                placeHolder={placeHolder}
                ref={textAreaRef}
              >
                { validate
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
                  icon={<CloseIcon className={styles['icon-single-textbox-icon']} />}
                />  
              )}
            </div>
          </div>
        </div>
      </>
    )


}

export default TextBox