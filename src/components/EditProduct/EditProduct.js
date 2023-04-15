import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as details from "../../services/productDetalService";
import * as editProduct from "../../services/editProduct";
import style from './Edit.module.css'
export const EditProduct = () => {
  const { id } = useParams();
  const [oldProduct, setOldProduct] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    details.product(id)
    .then((product) => {
      setOldProduct(product);
    });
  }, []);


  const onSubmitChanges = (e) => {
    e.preventDefault();
    const newInput= Object.fromEntries(new FormData(e.target))
    editProduct.edit(id, newInput)
    .then((result) => {
      setOldProduct(result);
      navigate(`/products/${id}`);
    });
  
  };



  return (
    <>
      <section className={style.wrapper}>
        <h1 className={style.h1}>Редактиране на артикул</h1>

        <form onSubmit={onSubmitChanges}>
          <div className={style.elements}>
            <input
                className={style.inputs}
              type="text"
              name="title"
              defaultValue={oldProduct.title}
           
            />

            <input
                className={style.inputs}
              type="text"
              name="brand"
              defaultValue={oldProduct.brand}
            />

            <input
                className={style.inputs}
              type="text"
              name="category"
              defaultValue={oldProduct.category}
            />

            <input
                className={style.inputs}
              type="text"
              name="ml"
              defaultValue={oldProduct.ml}
            />

            <input
                className={style.inputs}
              type="text"
              name="price"
              defaultValue={oldProduct.price}
            />

            <input
                className={style.inputs}
              type="text"
              name="imageUrl"
              defaultValue={oldProduct.imageUrl}
            />

            <textarea
              className={style.textarea}
              name="description"
              defaultValue={oldProduct.description}
            />
          </div>
          <button className={style.button} type="submit">Запамети</button>
        </form>
      </section>
    </>
  );
};
