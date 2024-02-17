import { useEffect, useState } from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';
import PizzaBlockSkeleton from './components/PizzaBlock/skeleton';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_MOCKAPI_URL)
      .then(res => res.json())
      .then(data => {
        setPizzas(data)
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
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
      </div>
    </div>
  );
}

export default App;
