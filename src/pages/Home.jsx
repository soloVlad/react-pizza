import { useEffect, useState } from "react";

import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_MOCKAPI_URL)
      .then(res => res.json())
      .then(data => {
        setPizzas(data)
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
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
    </div>
  )
}

export default Home;