import React from 'react'
import styles from './Button.module.css'

export const Button = ({
    onClick,
    buttonStyle
}) => {
    return (
        <button 
        className={styles[buttonStyle]} 
        onClick={onClick}
        >
            This is a button
        </button>
    )
}