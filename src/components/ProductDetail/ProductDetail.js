import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as details from "../../services/productDetalService";
import style from "./ProductDetail.module.css";
import { UserAuthenticate } from "../../context/context";
import { useContext } from "react";

export const ProductDetail = () => {
  const { authenticate } = useContext(UserAuthenticate);

  const [currentProduct, setCurrentProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    details.product(id).then((product) => {
      setCurrentProduct(product);
    });
  }, [id]);


  //  TODO:
  const onClikBuyButton = () => {};

  return (
    <div className={style.wrapper}>
      <div className={style.text}>
        <h1 className={style.title}>{currentProduct.title}</h1>
        <p className={style.subTitle}>{currentProduct.brand}</p>
        <p className={style.textEl}>{currentProduct.description}</p>
        {/* -------------------------Buy------------------------------ */}
        <div className={style.buy}>
          <p>{currentProduct.ml} мл.</p>

          <p className={style.price}>
            {currentProduct.price} <span>лв.</span>
          </p>
        </div>
      </div>

      {authenticate.accessToken &&
        authenticate._id !== currentProduct._ownerId && (
          <div className={style.buttonWrapper}>
            <button className={style.button} onClick={onClikBuyButton}>
              Купи
            </button>
          </div>
        )}
      {/* ------------------------- Image----------------------- */}
      <div className={style.imgWrapper}>
        <img
          src={currentProduct.imageUrl}
          alt={currentProduct.title}
          className={style.img}
        />
      </div>
    </div>
  );
};
