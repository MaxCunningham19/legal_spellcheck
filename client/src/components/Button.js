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
                { icon &&
                    <span>
                        {icon}
                    </span>
                }
                { text &&
                    <span className={styles[buttonStyle + "-text"]}>
                        {text}
                    </span>
                }
            </button>
        </>

    )
}
