import { FC } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://65d0c917ab7beba3d5e3aad7.mockapi.io/pizzas/' + id);
        setPizza(data);
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    }

    fetchData();
  }, []);

  if (!pizza) return (
    <div>Loading...</div>
  )

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza;