import React, { useState, useRef } from 'react'
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
              rows={10} // this is the initial default value for the text box, 
                          // it's a fixed amount of rows to display until the user makes an action, ie.clicks the box and types
            /> 
          </div>
        </div>
      </>
    )


}

export default TextBox