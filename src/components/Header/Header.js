import logo from "./images/logo.png";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserAuthenticate } from "../../context/context";

export const Header = () => {
  const { authenticate } = useContext(UserAuthenticate);
  return (
    <header className={style.header}>
      {/* ----------------------------------Logo---------------------------------------- */}
      <div>
        <Link to="/" className={style.logo}>
          <img src={logo} className={style.logo_img} alt="logo" />
          <div className="logo_text">
            <p className={style.logo_el_text}>
              <span className={style.text}>Natural</span>
              <span className={style.text}>Cosmetics</span>
            </p>
          </div>
        </Link>
      </div>
      {/* -------------------------------Navigate buttons------------------------------- */}
      <div className={style.navbar}>
        <ul className={style.nav_elements}>
          <li>
            <Link to="/catalog" className={style.element}>
              Продукти
            </Link>
          </li>
          {/* <li>
            <Link to="/promo" className={style.element}>
              Промоции
            </Link>
          </li> */}
        
          {/* -------------------------------User buttons------------------------------------- */}

          <div className={style.users_element}>
            {authenticate.accessToken && (
              <Link to="/profile" style={{textDecoration:'none'}}>
              <span className={style.emailName}>
                {authenticate.firstName} {authenticate.lastName}
              </span>
              </Link>
            )}

            {!authenticate.accessToken ? (
              <li className={style.user_el}>
                <Link to="/login" className={style.element_user}>
                  <i className="fas fa-sign-in-alt" /> Вход
                </Link>
              </li>
            ) : (
              <>
              <li className={style.user_el}>
                  <Link to="/likes" className={style.element_user}>
                    <i className="far fa-heart" style={{ margin: "0 2px" }} />
                    {/* like */}
                  </Link>
                </li>
                <li className={style.user_el}>
                  <Link to="/create" className={style.element_user}>
                    <i className="fas fa-plus" style={{ margin: "0 2px" }} />
                    {/* Добави */}
                  </Link>
                </li>
                <li className={style.user_el}>
                  <Link to="/logout" className={style.element_user}>
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ margin: "0 2px" }}
                    />
                    {/* Изход */}
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};
