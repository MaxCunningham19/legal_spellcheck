import React, { useState, useRef, useEffect } from 'react'
import styles from './Mistake.module.css'
import { PopUp } from './PopUp'

export const Mistake = ({
    text,
    suggestion
}) => {

  const mistakeRef = useRef(null)
  const [editableText, setEditableText] = useState(text)
  const [showPopUp, setShowPopUp] = useState(false)

  const handleOnHover = (e) => {
    setShowPopUp(() => true)
  }

  const handleOnMouseOut = (e) => {
    setShowPopUp(() => false)
  }

  const handleOnInput = (e) => {
    
  }

  const handleOnClick = (e) => {
    setShowPopUp(() => true)
  }

  const handleOnPopUpHover = () => {
    // TODO: this will be useful if we want popup clickable
    // setShowPopUp(() => true)
  }

  return (
    <>
      <span className={styles["mistake-container"]}>
        <span 
          suppressContentEditableWarning={true}
          className={styles["highlight"]} 
          onInput={(e) => handleOnInput(e)}
          onClick={(e) => handleOnClick(e)}
          onMouseOver={(e) => handleOnHover(e)}
          onMouseOut={(e) => handleOnMouseOut(e)}
          ref={mistakeRef}
        >
          {text}
        </span>    
        <PopUp 
          isOpened={showPopUp}
          content={suggestion}
          onPopUpHover={handleOnPopUpHover}
        />
      </span>
    </>
  )
}