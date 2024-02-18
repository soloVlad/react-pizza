import { useEffect, useState } from "react";

import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    property: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const categorySelection = categoryId > 0 ? `category=${categoryId}` : '';
    const searchSelection = searchValue ? `&search=${searchValue}` : '';

    const Url = `${process.env.REACT_APP_MOCKAPI_URL}/?page=${currentPage}&limit=4&${categorySelection}&sortBy=${sortType.property}&order=desc${searchSelection}`;

    fetch(Url)
      .then(res => res.json())
      .then(data => {
        setPizzas(data)
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {
          isLoading
            ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
            : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
        }
      </div>

      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home;