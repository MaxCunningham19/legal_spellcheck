import React, { useLayoutEffect, useState } from 'react'
import styles from './ListIcon.module.css'
import ReactLoading from 'react-loading'
import axios from 'axios'

const PREVIEW_CHAR_LIMIT = 220

export const ListIcon = ({
  onClickRow,
  rowStyle,
  title,
  created,
  updated,
  id,
  isLoading
}) => {

  const [preview, setPreview] = useState("")
  const [clicked, setClicked] = useState(false)

  const handleOnClickRow = (e, id, title) => {
    setClicked(() => true)
    onClickRow(e, id, title)
  }

  return (
    <>
        <button 
          className={(isLoading && clicked) ? styles[rowStyle + "-loading"] : styles[rowStyle]}
          onClick={(e) => handleOnClickRow(e, id, title)}
        >
          <span className={styles[rowStyle + "-title"]}>
            {title}
          </span>
          <span className={styles[rowStyle + "-created"]}>
            {created}
          </span>
          <span className={styles[rowStyle + "-updated"]}>
            {updated}
          </span>
          {/* { (isLoading && clicked)
            ? <div className={styles["loading-icon-container"]}>
                <ReactLoading type={"spin"} color={"#8BA3CC"} height={"50%"} width={"50%"} />
              </div>
            : <div className={styles[previewStyle + "-body"]}>
                {adaptToPreview(preview)}
              </div> 
          } */}
        </button>      
    </>
  )
}
