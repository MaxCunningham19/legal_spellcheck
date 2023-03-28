import React, { useState, useEffect, useRef } from "react"
import styles from "./PopUp.module.css"

export const PopUp = ({ isOpened, content, buttonText, onPopUpHover }) => {

  if (!isOpened) return null
  return (
    <>
        <div 
          contentEditable={false} 
          className={styles["popup-container"]} 
          onMouseOver={onPopUpHover}
        >
          <div className={styles["popup-description"]}>suggestion</div>
          <div className={styles["popup-suggestion"]}>{content}</div>
        </div>
    </>
  )
}