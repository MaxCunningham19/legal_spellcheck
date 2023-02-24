import React, { useState } from 'react'
import styles from './ExplorerPreview.module.css'
import documentsData from '../data/documentsData.json'
import { ExplorerPreview } from './ExplorerPreview'
// TODO: import { ExplorerList } from './ExplorerList'

function Explorer() {

  const [explorerData, setExplorerData] = useState(documentsData.documents)

  return (
    <>
      <section className={styles['Explorer']}>
        <div className={styles['explorer-container']}>
          <ExplorerPreview 
            explorerData={explorerData}
          />
          {/*TODO: ExplorerPreview can then be swapped to ExplorerList*/}
        </div>
      </section>
    </>
  )
}

export default Explorer