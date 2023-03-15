import React, { useState } from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'
import { ReactComponent as PlusIcon } from "../icons/plus.svg"

export const Carousel = ({ data, validateAll }) => {

  const [carouselData, setCarouselData] = useState(data)

  const onChangeInput = (e, id) => {
    const newContent = e.target.value;
    const editData = carouselData.map((item) => 
      item.block_order === id ? {...item, block_content : newContent } : item
    )  
    setCarouselData(editData) 
  }

  const onAddParagraphClick = (e) => {
    setCarouselData([
      ...carouselData, ""
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
        content={block}
        placeHolder="Start typing"
        onChangeInput={onChangeInput}
        onRemoveClick={onRemoveParagraphClick}
        validate={validateAll && true}
      /> 
    ))
  }

  return (
    <>
      <section className={styles['Carousel']}>
        <div className={styles['carousel-container']}>
          {mapCarouselComponents()}
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