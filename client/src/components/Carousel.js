import React, { useEffect, useState, useRef } from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'
import { ReactComponent as PlusIcon } from "../icons/plus.svg"
import { useDocument, useDocumentUpdate } from '../hooks/DocumentContext'

export const Carousel = ({ data, validateAll, forwardedRef }) => {

  const [carouselData, setCarouselData] = useState(data)
  const textAreaRef = useRef(null)
  const updateDocument = useDocumentUpdate()
  const document = useDocument()

  const onAddParagraphClick = (e) => {
    updateDocument((prevData) => ({...prevData, blocks: addNewBlock(prevData.blocks)}))
    // updateDocument((prevData) => ({...prevData, block_order: { after: getPreviousBlock(prevData.blocks)} }))
    mapCarouselComponents()
  }

  const addNewBlock = (oldBlocks) => {
    let newBlocks = [...oldBlocks]
    newBlocks.push({block_content: "", after: getPreviousBlockId(oldBlocks)})
    return newBlocks
  }

  const getPreviousBlockId = (oldBlocks) => {
    if (oldBlocks.length < 1) return -1
    for (let i = oldBlocks.length-1; i >= 0; i--) {
      if (oldBlocks[i].id !== undefined) return oldBlocks[i].id
    }
    return -1
  }

  const onRemoveParagraphClick = (e, id) => {
    updateDocument((prevDocument) =>
      ({...prevDocument, blocks: filterParagraph(id, id)})
    )
    mapCarouselComponents()
  }

  const filterParagraph = (start, end) => {
    const left = document.blocks.slice(0, start)
    const right = document.blocks.slice(end+1)
    const filtered = left.concat(right)
    return filtered
  }

  const mapCarouselComponents = () => {
    return document.blocks.map((block, index) => (
      <TextBox 
        boxStyle="paragraph-text-box"
        key={index}
        id={index}
        uniqueid={block.id}
        after={block.after}
        content={block.block_content}
        placeholder="Start typing"
        onRemoveClick={onRemoveParagraphClick}
        validate={validateAll && true}
        forwardedRef={textAreaRef}
      /> 
    ))
  }

  return (
    <>
      <section className={styles['Carousel']}>
          <div className={styles['carousel-container']} ref={forwardedRef}>
            { mapCarouselComponents() }
            <Button 
              buttonStyle="icon-add-component-textarea" 
              onClick={onAddParagraphClick}
              text="Click to add paragraph" 
              icon={<PlusIcon className={styles['icon-add-component-textarea-icon']} />}
            />
          </div>
          <div className={styles['mistakeBox-container']}>
        </div>
      </section>

    </>
  )
}

export default Carousel