import { useState, useEffect } from "react";
import style from "./Billboard.module.css";
import * as bann from "../../services/bannerService";

export const Billboard = () => {
  const [banner, setBanner] = useState([]);
  const [indexEl, setIndexEl] = useState(0);

  useEffect(() => {
    bann.getBanner().then((result) => {
      setBanner(result);
      // console.log(result);
    });
  }, []);

  const lenElement = Number(banner.length);

  const clickLeft = () => {
    setIndexEl((state) => (state === 0 ? lenElement - 1 : state - 1));
  };

  const clickRight = () => {
    setIndexEl((state) => (state === lenElement - 1 ? 0 : state + 1));
  };

  if (banner.length <= 0) {
    return null;
  }

  return (
    <div className={style.banne}>
      <div className={style.arrowLeft}>
        <i className="fas fa-chevron-left" onClick={clickLeft} />
      </div>

      <div className={style.card}>
        {banner.map((element, index) => (
          <div
            className={index === indexEl ? style.show : style.hide}
            key={index}
          >
            <img className={style.img} src={element.imageUrl} alt="banner" />
          </div>
        ))}
      </div>

      <div className={style.arrowRight}>
        <i className="fas fa-chevron-right" onClick={clickRight} />
      </div>
    </div>
  );
};
