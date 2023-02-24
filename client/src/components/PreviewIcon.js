import React from 'react'
import styles from './PreviewIcon.module.css'

export const PreviewIcon = ({
    onClick,
    previewStyle,
    title,
    body
}) => {
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
                        {body}
                    </div>
                }
            </button>
        </>

    )
}
