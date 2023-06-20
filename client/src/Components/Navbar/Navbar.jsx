import { Link } from "react-router-dom";
import style from './Navbar.module.css'


const Navbar = () => {
    return (
        <div className={style.Contenedor}>
            <a className={style.text} href="https://www.linkedin.com/in/dannyvera/">Danny Vera</a>
            <Link to={'/home'} className={style.text}><span>Home</span></Link>
            <Link to={'/create'} className={style.text}><span>Create Recipe</span></Link>
        </div>
    )
}

export default Navbar;
