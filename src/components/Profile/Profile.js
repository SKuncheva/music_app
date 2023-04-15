import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuthenticate } from "../../context/context";
import style from "./Profile.module.css";
import * as catalog from "../../services/catalogService";
import { EditProduct } from "../EditProduct/EditProduct";
import { DeleteProduct } from "../DeleteProduct/DeleteProduc";

export const Profile = () => {
  const { authenticate } = useContext(UserAuthenticate);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    catalog.products().then((result) => {
      setProducts(result);
    });
  }, []);

  const ownProduct = products.filter(
    (x) => x._ownerId === authenticate._id && x
  );

  return (
    <>
      <div className={style.wrapper}>
        <h1 className={style.name}>
          {authenticate.firstName} {authenticate.lastName}
        </h1>
        <ul className={style.text}>
          {ownProduct.map((x) => (
            <li key={x._id} className={style.li}>
              <div>
                <i className="fas fa-check" style={{ marginRight: "5px" }} />
                {`${x.title}- ${x.brand}- ${x.price} лв.`}
              </div>
              <div>
                <Link to={`/products/${x._id}/edit`} element={<EditProduct />}>
                  <button className={style.buttons}>
                    <i className="fas fa-edit" />
                  </button>
                </Link>

                <Link
                  to={`/products/products/${x._id}`}
                  element={<DeleteProduct />}
                >
                  <button className={style.buttons}>
                    <i className="fas fa-trash" />
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
