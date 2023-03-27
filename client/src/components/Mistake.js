import React, { useState, useRef, useEffect } from 'react'
import styles from './Mistake.module.css'

export const Mistake = ({
    text,
    suggestion
}) => {

  const mistakeRef = useRef(null)
  const [editableText, setEditableText] = useState(text)
  const [showPopUp, setShowPopUp] = useState(false)

  const handleOnHover = (e) => {
    
  }

  const handleOnInput = (e) => {
    
  }

  const handleOnClick = (e) => {
    setShowPopUp(() => true)
  }

  return (
    <>
      { !showPopUp &&
      <span 
        suppressContentEditableWarning={true}
        className={styles["highlight"]} 
        onInput={(e) => handleOnInput(e)}
        onClick={(e) => handleOnClick(e)}
        onMouseOver={(e) => handleOnHover(e)}
        ref={mistakeRef}
      >
        {text}
      </span>
      }
      { showPopUp &&
        <span>
          {suggestion}
        </span>
      }
    </>
  )
}