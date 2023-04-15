import * as getliked from "../../services/likeService";
import { useContext, useEffect, useState } from "react";
import { UserAuthenticate } from "../../context/context";
import style from "./Like.module.css";

export const Like = () => {
  const { authenticate } = useContext(UserAuthenticate);
  const [product, setProduct] = useState([]);
  const currentUser = authenticate._id;

  useEffect(() => {
    getliked.get().then((result) => setProduct(result));
  }, []);

  const el = product.filter((x) => {
    return currentUser === x._ownerId ? x : null;
  });

  return (
    <>
      {el.length > 0 ? (
        <div className={style.wrapper}>
          <ul className={style.ul}>
            {el.map((x, index) => (
              <li key={index} className={style.li}>
                <div className={style.elements}>
                  {/* ----------------------------Image product------------------------------ */}
                  <div>
                    <img className={style.img} src={x.imageUrl} alt={x.brand} />
                  </div>
                  {/* ---------------------------Text product-------------------------------- */}
                  <div>
                    <h2>{x.title}</h2>
                    <div>
                      <p>{x.brand}</p>
                      <p>{x.price} лв.</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={style.wrapper}>
          <p style={{fontSize:'22px', fontWeight:'bold' }}>Нямате харесани продукти</p>
        </div>
      )}
    </>
  );
};
