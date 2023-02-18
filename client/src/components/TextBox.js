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
    
    const textAreaRef = useRef()

    useAutosizeTextArea(textAreaRef.current, content) 

    return (
      <>
        <div className={styles['TextBox']}>
          <div className={styles[boxStyle]}>
            <textarea
              className={styles['textarea']}
              value={content}
              onChange={(e) => onChangeInput(e, id)} 
              placeHolder="Start typing"
              ref={textAreaRef}
            /> 
            <div className={styles['icons-container']}>
              <Button 
                buttonStyle="icon-single-textbox" 
                onClick={(e) => onRemoveClick(e, id)}
                icon={<CloseIcon className={styles['icon-single-textbox-icon']} />}
              />  
            </div>
          </div>
        </div>
      </>
    )


}

export default TextBox