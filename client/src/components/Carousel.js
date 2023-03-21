import React, { useEffect, useState, useRef } from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'
import { ReactComponent as PlusIcon } from "../icons/plus.svg"

export const Carousel = ({ data, validateAll, forwardedRef }) => {

  const [carouselData, setCarouselData] = useState(data)
  const textAreaRef = useRef(null)

  const onAddParagraphClick = (e) => {
    setCarouselData([
      ...carouselData, { block_content: "" }
    ])
    mapCarouselComponents()
  }

  const onRemoveParagraphClick = (e, id) => {
    setCarouselData(
      filterParagraph(id, id)
    )
    mapCarouselComponents()
  }

  const filterParagraph = (start, end) => {
    const left = carouselData.slice(0, start)
    const right = carouselData.slice(end+1)
    const filtered = left.concat(right)
    return filtered
  }

  const mapCarouselComponents = () => {
    return carouselData.map((block, index ) => (
      <TextBox 
        boxStyle="paragraph-text-box"
        key={index}
        id={index}
        uniqueid={block.id}
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
      </section>
    </>
  )
}

export default Carousel