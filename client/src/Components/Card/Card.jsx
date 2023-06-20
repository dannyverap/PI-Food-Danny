import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ id, name, image, summary, diets, healthScore, steps, createdInDB }) => {
    return (
        <div className={style.container}>
            <div className={style.containerImage}>
                <img src={image} className={`${style.image} ${style.fixedSizeImage}`} alt='' />

            </div>
            <NavLink to={`/detail/${id}`} className={style.name} >
                <p>{name}</p>
            </NavLink>
            <div >
                <p className={style.diets}> {diets?.map(diet => <a key={diet}>{diet.toUpperCase()}</a>)}</p>
            </div>
            <p className={style.healthScore}>HealthScore: {healthScore}</p>
        </div>
    )
}

export default Card;
