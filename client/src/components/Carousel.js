import React, { useState } from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'
import { ReactComponent as PlusIcon } from "../icons/plus.svg"

export const Carousel = ({ data }) => {

  const [carouselData, setCarouselData] = useState(data)

  const onChangeInput = (e, id) => {
    const newContent = e.target.value;
    const editData = carouselData.map((item) => 
      item.id === id ? {...item, content : newContent } : item
    )  
    setCarouselData(editData) 
  }

  const onAddParagraphClick = (e) => {
    setCarouselData([
      ...carouselData,
      {id: carouselData.length, content: ""}
    ])
    mapCarouselComponents()
  }

  const onRemoveParagraphClick = (e, id) => {
    console.log(id);
    setCarouselData(
      carouselData.filter(item =>
        item.id !== id)
    )
    mapCarouselComponents()
  }

  const mapCarouselComponents = () => {
    return carouselData.map(({ id, content }) => (
      <TextBox 
        boxStyle="paragraph-text-box"
        key={id}
        id={id}
        content={content} 
        placeHolder="Start typing"
        onChangeInput={onChangeInput}
        onRemoveClick={onRemoveParagraphClick}
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