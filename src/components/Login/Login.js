import style from "./Login.module.css";
import { Link } from "react-router-dom";
import userIcon from "./image/user.png";
import { UserAuthenticate } from "../../context/context";
import { useContext } from "react";
import { useForm } from "../../hooks/formStateHook";

export const Login = () => {
  const { onLoginSubmitHandler } = useContext(UserAuthenticate);
  const { values, changeHandler } = useForm(
    { email: "", 
    password: "" },
    onLoginSubmitHandler
  );

  const onFormSubmit = (e) => {
    e.preventDefault();
    onLoginSubmitHandler(values);
  };

  return (
    <div className={style.wrapper}>
      <form
        method="POST"
        className={style.formLoginWrapper}
        onSubmit={onFormSubmit}
      >
        <div className={style.userIconEl}>
          <img src={userIcon} alt="userIcon" className={style.userIcon} />
        </div>
        {/* ------------------------------------Email------------------------------------- */}
        <div className={style.elements}>
          <div className={style.emailInput}>
            <div className={style.icon}>
              <i className="fas fa-user" />
            </div>
            <input
              className={style.email}
              type="email"
              name="email"
              placeholder="Въведете имейл адрес"
              value={values.email}
              onChange={changeHandler}
            />
          </div>
          {/* -------------------------------Password------------------------------------------ */}
          <div className={style.passwordInput}>
            <div className={style.icon}>
              <i className="fas fa-lock" />
            </div>
            <input
              className={style.password}
              type="password"
              name="password"
              placeholder="Въведете парола"
              value={values.password}
              onChange={changeHandler}
            />
          </div>
        </div>
        {/* -------------------------------Button Login--------------------------------------- */}
        <div>
          <button className={style.button}>Вход</button>
        </div>
        {/* ---------------------------------Register----------------------------------------- */}
        <div className={style.registerLink}>
          <p className={style.p}>Нямате регистрация?</p>
          <Link to="/register" className={style.linkRegister}>
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
};
