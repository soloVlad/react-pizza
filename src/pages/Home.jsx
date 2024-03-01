import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from 'qs';

import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  }

  const onPageChange = (number) => {
    dispatch(setCurrentPage(number));
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);

      dispatch(setFilters(params));
    }
  }, []);

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

  useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        categoryId,
        sortProperty: sort.property,
        currentPage,
      });

      navigate(`?${params}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.property, currentPage]);

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

      <Pagination currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  )
}

export default Home;