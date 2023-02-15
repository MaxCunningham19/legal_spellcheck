import React from 'react'
import styles from './Button.module.css'

export const Button = ({
    onClick,
    buttonStyle,
    text
}) => {
    return (
        <button 
        className={styles[buttonStyle]} 
        onClick={onClick}
        > 
            {text}
        </button>
    )
}
