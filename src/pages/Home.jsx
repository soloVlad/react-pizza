import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { setCategoryId } from "../redux/slices/filterSlice";

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector(state => state.filter);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  }

  useEffect(() => {
    setIsLoading(true);

    const categoryUrl = categoryId > 0 ? `category=${categoryId}` : '';
    const searchUrl = searchValue ? `&search=${searchValue}` : '';

    const pageUrl = `page=${currentPage}`;
    const limitUrl = 'limit=4';
    const sortUrl = `sortBy=${sort.property}`;
    const orderUrl = 'order=desc';

    const Url = `${process.env.REACT_APP_MOCKAPI_URL}/?${pageUrl}&${limitUrl}&${categoryUrl}&${sortUrl}&${orderUrl}${searchUrl}`;

    axios.get(Url).then(res => {
      setPizzas(res.data);
      setIsLoading(false);
    })

    window.scrollTo(0, 0);
  }, [categoryId, sort.property, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
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