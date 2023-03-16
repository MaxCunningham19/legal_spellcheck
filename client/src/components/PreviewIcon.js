import React, { useLayoutEffect, useState } from 'react'
import styles from './PreviewIcon.module.css'
import axios from 'axios'

const PREVIEW_CHAR_LIMIT = 220

export const PreviewIcon = ({
    onClickPreview,
    previewStyle,
    title,
    id
}) => {

    const [preview, setPreview] = useState("")

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

    return (
        <>
            <button 
                className={styles[previewStyle]}
                onClick={(e) => onClickPreview(e, title)}
            >
                <span className={styles[previewStyle + "-title"]}>
                    {title}
                </span>
                { 
                    <div className={styles[previewStyle + "-body"]}>
                        {adaptToPreview(preview)}
                    </div>
                }
            </button>
        </>

    )
}
