import React from 'react'
import styles from './PreviewIcon.module.css'

const PREVIEW_CHAR_LIMIT = 220

export const PreviewIcon = ({
    onClickPreview,
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
                onClick={(e) => onClickPreview(e, title)}
            >
                <span className={styles[previewStyle + "-title"]}>
                    {title}
                </span>
                { body &&
                    <div className={styles[previewStyle + "-body"]}>
                        {adaptToPreview(body)}
                    </div>
                }
            </button>
        </>

    )
}
