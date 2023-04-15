import { Link } from "react-router-dom";
import style from './Footer.module.css';

export const Footer=()=>{
    return(
        <footer className={style.footer}>
        <div className={style.social}>
            <Link to="https://bg-bg.facebook.com/" className={style.socialEl}><i className="fab fa-facebook-square"/></Link>
            <Link to="https://www.instagram.com/?hl=bg" className={style.socialEl}><i className="fab fa-instagram-square"/></Link>
            <Link to="https://www.youtube.com/" className={style.socialEl}><i className="fab fa-youtube"/></Link>
        </div>

        <ul className={style.nav}>
            <li className={style.elements}>
                <Link to="/" className={style.el}>
                <i className="fas fa-home"/> Начало</Link>
                </li>
            <li className={style.elements}>
                <Link to="/about" className={style.el}>
                <i className="fab fa-shopify"/> За нас</Link>
                </li>
            <li className={style.elements}>
                <Link to="/protection" className={style.el}>
                <i className="fas fa-user-shield"/> Защита на личните данни</Link>
                </li>
        </ul>
        <p className={style.copyright}>Natural Cosmetics ©</p>
    </footer>
    );
};