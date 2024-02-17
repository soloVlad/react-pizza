import { useState } from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];

  const handleCategoryClick = (index) => {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories;