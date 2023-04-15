import { useState } from "react";
import style from "./CreateProduct.module.css";
import * as create from "../../services/createProductService";
import { useNavigate } from "react-router-dom";


export const CreateProduct = () => {

  const [newProduct, setNewProduct] = useState({
    title: "",
    brand: "",
    category: "",
    ml: "",
    price: "0,00",
    imageUrl: "",
    description: "",
  });

  const navigate = useNavigate();

  const onChangeProduct = (e) => {
    setNewProduct((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onCreateForm = (e) => {
    e.preventDefault();

    create.products(newProduct).then((result) => [...result, newProduct]);

    navigate("/catalog");
  };
  return (
    <>
      <section className={style.wrapper}>
        <h1 className={style.h1}>Добавете нов артикул</h1>

        <form onSubmit={onCreateForm}>
          <div className={style.elements}>
            <input
              className={style.inputs}
              type="text"
              name="title"
              placeholder="Заглавие"
              value={newProduct.title}
              onChange={onChangeProduct}
            />

            <input
              className={style.inputs}
              type="text"
              name="brand"
              placeholder="Марка"
              value={newProduct.brand}
              onChange={onChangeProduct}
            />

            <input
              className={style.inputs}
              type="text"
              name="category"
              placeholder="Категория"
              value={newProduct.category}
              onChange={onChangeProduct}
            />

            <input
              className={style.inputs}
              type="text"
              name="ml"
              placeholder="Милилитри"
              value={newProduct.ml}
              onChange={onChangeProduct}
            />

            <input
              className={style.inputs}
              type="text"
              name="price"
              placeholder="Цена"
              value={newProduct.price}
              onChange={onChangeProduct}
            />

            <input
              className={style.inputs}
              type="text"
              name="imageUrl"
              placeholder="Снимка"
              value={newProduct.imageUrl}
              onChange={onChangeProduct}
            />
          
              <textarea
                className={style.textarea}
                name="description"
                placeholder="Описание:"
                value={newProduct.description}
                onChange={onChangeProduct}
              />
          
          </div>
          <button className={style.button}>Запамети</button>
        </form>
      </section>
    </>
  );
};
