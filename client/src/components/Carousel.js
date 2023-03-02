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
      ...carouselData,
      {block_order: carouselData.length, block_content: ""}
    ])
    mapCarouselComponents()
  }

  const onRemoveParagraphClick = (e, id) => {
    setCarouselData(
      carouselData.filter(item =>
        item.block_order !== id)
    )
    mapCarouselComponents()
  }

  const mapCarouselComponents = () => {
    return carouselData.map(({ block_order, block_content }) => (
      <TextBox 
        boxStyle="paragraph-text-box"
        key={block_order}
        id={block_order}
        content={block_content}
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