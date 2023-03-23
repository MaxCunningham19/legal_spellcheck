import React, {} from "react";
import ReactLoading from "react-loading";
import styles from "./LoadingMessage.module.css"

export const LoadingMessage = ({
    percHeight, 
    percWidth,
    color,
    type,
    message,
    resultMessage,
    messageStyle
}) => {

    return (
      <>
        <div className={styles["LoadingMessage"]}>
          <div className={styles["loading-message-container"]}>
            <ReactLoading type={type} color={color} height={percHeight} width={percWidth} />
            <span className={styles[messageStyle]}>
              {(resultMessage !== undefined) ? resultMessage : message}
            </span>
          </div>       
        </div>   
      </>
    )
}