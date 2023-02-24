import React, { useState, useRef, useEffect } from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'
import { Button } from './Button'
import styles from './TextBox.module.css'
import { ReactComponent as CloseIcon } from "../icons/close.svg"

export const TextBox = ({
    boxStyle,
    id,
    content,
    onChangeInput,
    onRemoveClick
}) => {
    
    const [isHovering, setIsHovering] = useState(false)
    const [onFocus, setOnFocus] = useState(false)
    const textAreaRef = useRef()

    useAutosizeTextArea(textAreaRef.current, content)
    
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
            <textarea
              className={styles['textarea']}
              value={content}
              onChange={(e) => onChangeInput(e, id)} 
              placeHolder="Start typing"
              ref={textAreaRef}
            /> 
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