import React, { useState } from 'react'
import styles from './ExplorerPreview.module.css'
import { ExplorerPreview } from './ExplorerPreview'
// TODO: import { ExplorerList } from './ExplorerList'

export const Explorer = ({
  documentsData,
  handleOnClickDocument,
  handleOnClickAdd
}) => {

  const [explorerData, setExplorerData] = useState(documentsData)

  return (
    <>
      <section className={styles['Explorer']}>
        <div className={styles['explorer-container']}>
          <ExplorerPreview 
            explorerData={explorerData}
            onClickPreview={handleOnClickDocument}
            onClickAdd={handleOnClickAdd}
          />
          {/*TODO: ExplorerPreview can then be swapped to ExplorerList*/}
        </div>
      </section>
    </>
  )
}

export default Explorer