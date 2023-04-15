import { useState, useEffect } from "react";
import style from './Catalog.module.css'
import * as catalogService from "../../services/catalogService";
import img from './image/nigelbanner.jpg'
import { Product } from "../Product/Product";

export const Catalog = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    catalogService.products().then((result) => {
      setAllProducts(result);
    });
  }, []);


  return (
    <section>
      <div>
        <img src={img} alt='Catalog' className={style.imgCatalog}/>
      </div>
      <h1 className={style.title}>Продукти</h1>
      <ul className={style.ulWrapper}>
        {allProducts.map((x, index) => (
          <li key={index} 
          className={style.li}>
            <Product {...x} />
          </li>
        ))}
      </ul>
    </section>
  );
};
