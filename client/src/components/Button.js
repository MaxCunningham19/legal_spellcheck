import React from 'react'
import styles from './Button.module.css'

export const Button = ({
    onClick,
    buttonStyle,
    text,
    icon
}) => {
    return (
        <>
            <button 
            className={styles[buttonStyle]}
            onClick={(e) => onClick(e)}
            >
                <span>
                    {icon}
                </span>
                <span className={styles[buttonStyle + "-text"]}>
                    {text}
                </span>
            </button>
        </>

    )
}
