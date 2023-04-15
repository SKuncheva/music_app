import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as details from "../../services/productDetalService";
import * as del from "../../services/delProduct";
import style from './Delete.module.css'

export const DeleteProduct = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    details.product(id).then((product) => {
      setCurrentProduct(product);
    });
  }, []);

  const delProduct=()=>{
    del.deleteProduct(id);
    navigate('/profile')
  }
  const cancel=()=>{
    navigate('/profile')
  }
  return (
    <div className={style.wrapper}>
      <h1>Сигурни ли сте, че искате изприете '{currentProduct.title}' ?</h1>
      <div >
        <button className={style.buttonFirst} onClick={delProduct}>Да</button>
        <button className={style.buttonSecond} onClick={cancel}>Не</button>
      </div>
    </div>
  );
};
