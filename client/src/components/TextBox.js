import React, {useState} from 'react'
import { Button } from './Button'
import styles from './TextBox.module.css'

export const TextBox = ({
    type
}) => {
    return (
      <>
        <div className={styles['TextBox']}>
          <div className={styles[type]}>
            <text className='text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a ea at repellendus consectetur saepe qui architecto itaque perspiciatis id. Unde et sunt nemo natus exercitationem. Alias incidunt sequi, voluptate quis est id fugit illo deleniti aperiam porro fugiat corporis beatae similique, consectetur impedit obcaecati quae delectus sunt excepturi veniam?</text>
          </div>
        </div>
      </>
    )
}

export default TextBox