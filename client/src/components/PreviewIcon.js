import React, { useLayoutEffect, useState } from 'react'
import styles from './PreviewIcon.module.css'
import ReactLoading from 'react-loading'
import axios from 'axios'

const PREVIEW_CHAR_LIMIT = 220

export const PreviewIcon = ({
  onClickPreview,
  previewStyle,
  title,
  id,
  isLoading
}) => {

  const [preview, setPreview] = useState("")
  const [clicked, setClicked] = useState(false)

  useLayoutEffect(() => {
    fetchPreviewsData()
  }, [])

  const fetchPreviewsData = () => {
    axios
      .get(`/api/document/${id}`)
      .then((result) => {
        setPreview(result.data[0].block_content)
      })
      .catch((error) => {})
  }
  const adaptToPreview = (preview) => {
    return (
      (preview.length) > PREVIEW_CHAR_LIMIT 
        ? preview.substring(0, PREVIEW_CHAR_LIMIT)
        : preview
    )
  }

  const handleOnClickPreview = (e, id, title) => {
    setClicked(() => true)
    onClickPreview(e, id, title)
  }

  return (
    <>
        <button 
          className={(isLoading && clicked) ? styles[previewStyle + "-loading"] : styles[previewStyle]}
          onClick={(e) => handleOnClickPreview(e, id, title)}
        >
          <span className={styles[previewStyle + "-title"]}>
            {title}
          </span>
          { (isLoading && clicked)
            ? <div className={styles["loading-icon-container"]}>
                <ReactLoading type={"spin"} color={"#8BA3CC"} height={"50%"} width={"50%"} />
              </div>
            : <div className={styles[previewStyle + "-body"]}>
                {adaptToPreview(preview)}
              </div> 
          }
        </button>      
    </>
  )
}
