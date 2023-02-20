import React, { useState } from 'react'
import { Button } from './Button'
import styles from './Carousel.module.css'
import TextBox from './TextBox'
import { ReactComponent as PlusIcon } from "../icons/plus.svg"

const data = [
  {
    id: 0,      // this will be come from db (?)
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, enim magni quos nihil ad sint laudantium ut ex rem delectus aspernatur? Quam accusantium dicta quas! Dolor aliquid illo magni asperiores, cupiditate ad laudantium architecto, labore laborum saepe doloribus! Enim consectetur temporibus quasi numquam aut voluptatum ipsum quae maiores ad magnam, sed quas tempore eum autem perspiciatis aperiam, soluta voluptate impedit distinctio tenetur doloremque? Nam natus, animi ea aliquam voluptatum accusantium mollitia debitis corporis, minus maiores, beatae illum quaerat error velit hic voluptatibus. Veniam necessitatibus quae fuga ut vero atque cumque dolorem deserunt, dolorum deleniti ullam cum ad! Beatae corrupti ratione voluptatem animi quos! Facere corrupti vitae non alias officia inventore nostrum tempore fugiat ipsum perferendis, aliquid molestiae! Reiciendis beatae vero natus neque! Molestiae temporibus distinctio id. Maxime provident animi accusantium nesciunt, asperiores sit. Corporis, id. Aperiam quia hic maxime dolor officia minima, repellat quam temporibus molestias perferendis illo quas. Ex praesentium distinctio fuga illum voluptatem facilis omnis odit doloribus enim provident in sequi ullam neque atque autem dolor officia repudiandae rem cupiditate at et, ab explicabo? Provident aperiam minus eum totam assumenda, dolore voluptatibus veniam incidunt, rem nulla reiciendis dolores. Esse adipisci, mollitia laudantium officiis porro eveniet blanditiis fugit suscipit."
  },
  {
    id: 1,      
    content: "Fuga ipsam commodi rem incidunt atque provident nam id ex consectetur. Pariatur quo repellendus deserunt laboriosam repudiandae itaque delectus ipsa distinctio et iste adipisci non exercitationem fugit unde sint perspiciatis, sapiente voluptatem voluptate dolore numquam voluptates magni in ea. Doloremque voluptatum laudantium labore perspiciatis provident repellendus neque natus. Maxime rem iste fugiat inventore hic error, ratione fugit enim eos illum assumenda delectus incidunt quia tempora provident cum dolorem totam quis commodi vero repudiandae sunt corrupti atque. Quasi nobis voluptas tempora molestias, in fugiat laudantium repellendus illum nihil rem nemo officia hic perspiciatis nostrum voluptatum aliquid facere! Deleniti totam accusantium rerum beatae accusamus harum? Autem reiciendis quis cumque quasi consequuntur natus veniam, nobis molestias ipsam a, delectus illum quo. Ipsam eos laboriosam, suscipit nesciunt non a soluta, obcaecati tempora, sit officiis ipsa quae totam quia molestias quisquam! Ipsa, nulla nam. Minima, culpa cumque."
  },
  {
    id: 2,      
    content: "Aut iusto ratione cum, magnam deserunt omnis soluta voluptas perferendis illo delectus quaerat, repellat unde eveniet eligendi dolores quos sint sequi explicabo architecto maxime. Aspernatur sit accusantium velit animi saepe, eos labore suscipit optio voluptatem doloremque, rerum eaque. Inventore nulla minus quo aspernatur accusantium. Eum nisi culpa temporibus officia aspernatur soluta nihil necessitatibus, dolor dolorum laboriosam adipisci! Veniam nobis beatae ex doloribus similique perferendis nam optio saepe iusto porro rem totam quaerat iure a exercitationem tenetur distinctio repellendus adipisci natus voluptatum atque, temporibus repudiandae placeat consequatur. Placeat soluta eum excepturi facilis cumque iusto in nostrum enim debitis ipsam ab odio, totam recusandae suscipit, atque illo culpa officia quod reprehenderit quis aspernatur voluptatem pariatur ea. A explicabo similique et. Corporis doloribus mollitia quos eaque illo suscipit, exercitationem quas! Laudantium et recusandae iste repellendus vel. Odio veniam explicabo impedit ea, sapiente et aliquam ratione accusantium cupiditate nostrum assumenda nihil beatae iusto soluta autem error mollitia distinctio repudiandae nisi laborum officiis odit. Sint quaerat deserunt laborum architecto vero, quas illo pariatur accusamus numquam, ad et magni eveniet voluptas ullam! Dolore sed, consectetur nemo maiores officia doloribus voluptate. Dolores aliquid rem reiciendis veritatis consectetur perspiciatis eos voluptatibus quidem ut quod, corporis eum nobis odit dolorum est voluptates minus laborum cupiditate amet non deserunt repellendus! Assumenda earum temporibus ipsa porro, molestias obcaecati praesentium, aliquam quod impedit, accusantium deleniti tenetur possimus asperiores iste sunt! Expedita libero saepe sunt alias odit hic molestias perferendis fuga provident rem totam in maiores recusandae aut aperiam, eius cupiditate neque nostrum voluptas voluptate. Nulla quisquam beatae molestias assumenda ratione expedita mollitia, consectetur voluptatum, iusto maiores consequatur impedit totam facilis sit deserunt repellat perspiciatis praesentium voluptates vel et, atque excepturi? Voluptas optio temporibus distinctio atque necessitatibus dicta facere blanditiis iusto sit repudiandae, beatae reprehenderit odit impedit neque debitis voluptatem! Esse, error enim explicabo sapiente necessitatibus vitae quos aperiam harum consequatur. Dignissimos blanditiis laudantium unde aperiam et numquam sint, corporis, suscipit possimus, cum nam tempore aliquam minus eius natus enim minima dolorum in veniam! Alias incidunt voluptatem magnam nulla quibusdam omnis quasi mollitia, nam quaerat temporibus distinctio esse ut commodi ab veniam soluta! Quae sunt nisi nam. Harum earum totam fuga nostrum omnis saepe mollitia. Fuga officia placeat laboriosam. Fuga cumque odio facere fugit voluptate ratione saepe porro voluptatum ex, voluptas iure eligendi vitae impedit dolor aliquam quaerat vel unde, voluptatibus, itaque animi architecto ea?"
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