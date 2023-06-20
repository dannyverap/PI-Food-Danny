import { Link } from "react-router-dom";
import style from "./Landing.module.css"

const Landing = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div>
                    <h1>Bienvenidos al PI Food</h1>
                    <Link to={`/home`} >
                        <button className={style.button}>Empezar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Landing;