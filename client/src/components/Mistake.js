import React, { useState, useRef, useEffect } from 'react'
import styles from './Mistake.module.css'

export const Mistake = ({
    text
}) => {

  const mistakeRef = useRef(null)
  const [editableText, setEditableText] = useState(text)

  useEffect(() => {
    console.log(editableText);
  }, [editableText])


  const handleOnHover = (e) => {
    
  }

  const handleOnInput = (e) => {
    console.log("ciao");
  }

  const handleOnBlur = (e) => {
    console.log("eccoci");
  }

  return (
    <>
      <span contentEditable
        suppressContentEditableWarning={true}
        className={styles["highlight"]} 
        onInput={(e) => handleOnInput(e)}
        onBlur={(e) => handleOnBlur(e)}
        onMouseOver={(e) => handleOnHover(e)}
        ref={mistakeRef}
      >
        {text}
      </span>
    </>
  )
}