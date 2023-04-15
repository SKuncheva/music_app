import style from "./Product.module.css";
import { Link } from "react-router-dom";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { UserAuthenticate } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import * as liked from "../../services/likeService";
import * as request from "../../services/requester";

export const Product = ({ _id, imageUrl, title, brand, price, _ownerId }) => {
  const { authenticate } = useContext(UserAuthenticate);
  const [like, setLike] = useState(false);

  useEffect(() => {
    request
      .get(
        `http://localhost:3030/data/likes/?where=idProduct IN ("${_id}")  AND _ownerId  IN ("${authenticate._id}")`
      )
      .then((result) => {
        if (result[0] === undefined) {
          return {};
        } else if (result && result[0].user) {
          setLike(true);
        }
      });
      console.log('test');
  }, [like, _id, authenticate._id]);

  const likes = () => {
    if (like === false) {
      setLike((x) => !x);
      const user = authenticate._id;
      liked
        .likeS({ user, idProduct: _id, title, brand, price, imageUrl })
        .then();
    } else if (like === true) {
      setLike((x) => !x);
      liked.deleteL(_id);
    }
  };
  return (
    <>
      {_id !== undefined && (
        <div className={style.el}>
          {/* ----------------------------Image product------------------------------ */}
          <div className={style.imgEl}>
            <img src={imageUrl} alt={brand} className={style.img} />
          </div>
          {/* ---------------------------Text product-------------------------------- */}
          <div className={style.text}>
            <Link
              to={`/products/${_id}`}
              element={<ProductDetail />}
              className={style.title}
            >
              <h2 className={style.title}>{title}</h2>
            </Link>
            <div className={style.textElements}>
              <p>{brand}</p>
              <p className={style.price}>{price} лв.</p>
            </div>
          </div>

          {/* --------------------------Button like----------------------------------- */}

          {authenticate._id !== _ownerId && (
            <div className={style.button}>
              {like === false ? (
                <i
                  onClick={likes}
                  className="far fa-heart"
                  style={{ fontSize: "26px" }}
                />
              ) : (
                <i
                  onClick={likes}
                  className="fas fa-heart"
                  style={{ fontSize: "26px", color: "palevioletred" }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
