import React from 'react'
import styles from './PreviewIcon.module.css'

export const PreviewIcon = ({
    onClick,
    previewStyle,
    title,
    body
}) => {

    const generatePreview = (body) => {
        return (
            (body.length) > 20 ? body.split(' ').slice(0, 20).join(" ") : body
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
                        {generatePreview(body)}
                    </div>
                }
            </button>
        </>

    )
}
