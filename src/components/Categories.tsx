import { FC } from "react";

const categories = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
}

const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            className={index === value ? 'active' : ''}
            onClick={() => onChangeCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories;