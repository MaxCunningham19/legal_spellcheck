import React, { useState, useRef, useEffect } from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'
import { Button } from './Button'
import styles from './TextBox.module.css'

export const TextBox = ({
    boxStyle,
    id,
    content,
    onChangeInput,

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
          </div>
        </div>
      </>
    )


}

export default TextBox