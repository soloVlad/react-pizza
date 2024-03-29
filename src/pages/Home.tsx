import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from 'qs';

import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzas.slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  //@ts-ignore-next-line
  const { categoryId, searchValue, sort, currentPage } = useSelector(state => state.filter);
  //@ts-ignore-next-line
  const { items: pizzas, status } = useSelector(state => state.pizzas);

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  }

  const onPageChange = (number: number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {
    const categoryUrl = categoryId > 0 ? `category=${categoryId}` : '';
    const searchUrl = searchValue ? `&search=${searchValue}` : '';

    const pageUrl = `page=${currentPage}`;
    const limitUrl = 'limit=4';
    const sortUrl = `sortBy=${sort.property}`;
    const orderUrl = 'order=desc';

    const Url = `${process.env.REACT_APP_MOCKAPI_URL}/?${pageUrl}&${limitUrl}&${categoryUrl}&${sortUrl}&${orderUrl}${searchUrl}`;

    // @ts-ignore-next-line
    dispatch(fetchPizzas(Url));

    window.scrollTo(0, 0);
  }

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


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.property, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === 'error'
        ? (
          <div>Ooops</div>
        )
        : (
          <>
            <div className="content__items">
              {
                status === 'loading'
                  ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
                  : pizzas.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)
              }
            </div>

            <Pagination currentPage={currentPage} onPageChange={onPageChange} />
          </>
        )
      }
    </div >
  )
}

export default Home;