import React, { useState } from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'

const data = [
  {
    id: 1,      // this will be come from db (?)
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, enim magni quos nihil ad sint laudantium ut ex rem delectus aspernatur? Quam accusantium dicta quas! Dolor aliquid illo magni asperiores, cupiditate ad laudantium architecto, labore laborum saepe doloribus! Enim consectetur temporibus quasi numquam aut voluptatum ipsum quae maiores ad magnam, sed quas tempore eum autem perspiciatis aperiam, soluta voluptate impedit distinctio tenetur doloremque? Nam natus, animi ea aliquam voluptatum accusantium mollitia debitis corporis, minus maiores, beatae illum quaerat error velit hic voluptatibus. Veniam necessitatibus quae fuga ut vero atque cumque dolorem deserunt, dolorum deleniti ullam cum ad! Beatae corrupti ratione voluptatem animi quos! Facere corrupti vitae non alias officia inventore nostrum tempore fugiat ipsum perferendis, aliquid molestiae! Reiciendis beatae vero natus neque! Molestiae temporibus distinctio id. Maxime provident animi accusantium nesciunt, asperiores sit. Corporis, id. Aperiam quia hic maxime dolor officia minima, repellat quam temporibus molestias perferendis illo quas. Ex praesentium distinctio fuga illum voluptatem facilis omnis odit doloribus enim provident in sequi ullam neque atque autem dolor officia repudiandae rem cupiditate at et, ab explicabo? Provident aperiam minus eum totam assumenda, dolore voluptatibus veniam incidunt, rem nulla reiciendis dolores. Esse adipisci, mollitia laudantium officiis porro eveniet blanditiis fugit suscipit."
  },
  {
    id: 2,      
    content: "Dolor lorem ipsum, sit amet consectetur adipisicing elit. Molestias, enim magni quos nihil ad sint laudantium ut ex rem delectus aspernatur? Quam accusantium dicta quas! Dolor aliquid illo magni asperiores, cupiditate ad laudantium architecto, labore laborum saepe doloribus! Enim consectetur temporibus quasi numquam aut voluptatum ipsum quae maiores ad magnam, sed quas tempore eum autem perspiciatis aperiam, soluta voluptate impedit distinctio tenetur doloremque? Nam natus, animi ea aliquam voluptatum accusantium mollitia debitis corporis, minus maiores, beatae illum quaerat error velit hic voluptatibus. Veniam necessitatibus quae fuga ut vero atque cumque dolorem deserunt, dolorum deleniti ullam cum ad! Beatae corrupti ratione voluptatem animi quos! Facere corrupti vitae non alias officia inventore nostrum tempore fugiat ipsum perferendis, aliquid molestiae! Reiciendis beatae vero natus neque! Molestiae temporibus distinctio id. Maxime provident animi accusantium nesciunt, asperiores sit. Corporis, id. Aperiam quia hic maxime dolor officia minima, repellat quam temporibus molestias perferendis illo quas. Ex praesentium distinctio fuga illum voluptatem facilis omnis odit doloribus enim provident in sequi ullam neque atque autem dolor officia repudiandae rem cupiditate at et, ab explicabo? Provident aperiam minus eum totam assumenda, dolore voluptatibus veniam incidunt, rem nulla reiciendis dolores. Esse adipisci, mollitia laudantium officiis porro eveniet blanditiis fugit suscipit."
  },
  {
    id: 3,      
    content: "Ipsum lorem dolor, sit amet consectetur adipisicing elit. Molestias, enim magni quos nihil ad sint laudantium ut ex rem delectus aspernatur? Quam accusantium dicta quas! Dolor aliquid illo magni asperiores, cupiditate ad laudantium architecto, labore laborum saepe doloribus! Enim consectetur temporibus quasi numquam aut voluptatum ipsum quae maiores ad magnam, sed quas tempore eum autem perspiciatis aperiam, soluta voluptate impedit distinctio tenetur doloremque? Nam natus, animi ea aliquam voluptatum accusantium mollitia debitis corporis, minus maiores, beatae illum quaerat error velit hic voluptatibus. Veniam necessitatibus quae fuga ut vero atque cumque dolorem deserunt, dolorum deleniti ullam cum ad! Beatae corrupti ratione voluptatem animi quos! Facere corrupti vitae non alias officia inventore nostrum tempore fugiat ipsum perferendis, aliquid molestiae! Reiciendis beatae vero natus neque! Molestiae temporibus distinctio id. Maxime provident animi accusantium nesciunt, asperiores sit. Corporis, id. Aperiam quia hic maxime dolor officia minima, repellat quam temporibus molestias perferendis illo quas. Ex praesentium distinctio fuga illum voluptatem facilis omnis odit doloribus enim provident in sequi ullam neque atque autem dolor officia repudiandae rem cupiditate at et, ab explicabo? Provident aperiam minus eum totam assumenda, dolore voluptatibus veniam incidunt, rem nulla reiciendis dolores. Esse adipisci, mollitia laudantium officiis porro eveniet blanditiis fugit suscipit."
  }
]

export const Carousel = () => {
  const [carouselData, setCarouselData] = useState(data)

  const onChangeInput = (e, id) => {
    const newContent = e.target.value;
    const editData = carouselData.map((item) => 
      item.id === id ? {...item, content : newContent } : item
    )  
    setCarouselData(editData) 
  }

  return (
    <>
      <section className={styles['Carousel']}>
        <div className={styles['carousel-container']}>
          {carouselData.map(({ id, content }) => (
            <TextBox 
              boxStyle="paragraph-text-box"
              key={id}
              id={id}
              content={content} 
              onChangeInput={onChangeInput}
            /> 
          ))}
        </div>
      </section>
    </>
  )
}

export default Carousel