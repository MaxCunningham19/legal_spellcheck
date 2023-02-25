import React from 'react'
import styles from './PreviewIcon.module.css'

const PREVIEW_CHAR_LIMIT = 130

export const PreviewIcon = ({
    onClick,
    previewStyle,
    title,
    body
}) => {

    const adaptToPreview = (body) => {
        return (
            (body.length) > PREVIEW_CHAR_LIMIT 
                ? body.substring(0, PREVIEW_CHAR_LIMIT)
                : body
        )
    }

    return (
        <>
            <button 
            className={styles[previewStyle]}
            onClick={(e) => onClick(e)}
            >
                <div className={styles[previewStyle + "-title"]}>
                    {title}
                </div>
                { body &&
                    <div className={styles[previewStyle + "-body"]}>
                        {adaptToPreview(body)}
                    </div>
                }
            </button>
        </>

    )
}
