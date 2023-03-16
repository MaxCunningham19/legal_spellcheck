import React, { useState, useEffect } from 'react'
import styles from './ExplorerPreview.module.css'
import { ExplorerPreview } from './ExplorerPreview'
// TODO: import { ExplorerList } from './ExplorerList'

export const Explorer = ({
  documentsData,
}) => {

  return (
    <>
      <section className={styles['Explorer']}>
        <div className={styles['explorer-container']}>
          <ExplorerPreview 
            explorerData={documentsData}
          />
          {/*TODO: ExplorerPreview can then be swapped to ExplorerList*/}
        </div>
      </section>
    </>
  )
}

export default Explorer