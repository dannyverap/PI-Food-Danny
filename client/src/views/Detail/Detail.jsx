import style from "./Detail.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { SET_LOADING } from "../../Redux/action";
import { useNavigate } from 'react-router-dom'

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState();
    const [error, setError] = useState("");
    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        const findRecipe = async () => {
            dispatch({ type: SET_LOADING, payload: true });
            try {
                const { data } = await axios.get(`recipes/${id}`);
                if (data.name) {
                    setRecipe(data);
                }
            } catch (error) {
                setError(`No hay información del id ${id}`);
            }

            dispatch({ type: SET_LOADING, payload: false }); // Establecer isLoading en false
        };

        findRecipe();
    }, [dispatch, id]);


    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar esta receta?");

        if (confirmDelete) {
            try {
                await axios.delete(`recipes/${id}`);
                navigate("/home")
            } catch (error) {
                setError(` ${error}`);
            }
        }
    };

    if (isLoading) {
        return (
            <div className={`${style.loadingContainer} ${style.loading}`}>
                <div className={style.spinner}></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <p className={style.error}>{error}</p>;
    }

    if (recipe) {
        return (
            <div className={style.container}>
                <div className={style.detailContainer}>
                    <h1 className={style.title}>{recipe.name}</h1>
                    <div className={style.recipeInfo}>
                        <p className={style.summary}>{recipe.summary}</p>
                        <h2 className={style.healthScoreTitle}>Health score:</h2>
                        <p className={style.healthScore}>{recipe.healthScore}</p>
                        <h2 className={style.stepsTitle}>Steps:</h2>
                        {!recipe.createdInDB ? (
                            <ol className={style.stepsList}>
                                {recipe.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        ) : (
                            <p className={style.stepsList}>
                                {recipe.steps}
                            </p>
                        )}
                        <h2 className={style.dietsTitle}>Diets:</h2>
                        <p className={style.diets}>{recipe.diets.join(", ")}</p>
                    </div>
                    <div className={style.imageContainer}>
                        <img className={style.image} src={recipe.image} alt="" />
                    </div>
                    {recipe.createdInDB ? (
                        <div>
                            <button
                                onClick={handleDeleteClick}
                                className={style.button}
                            >
                                Borrar
                            </button>
                        </div>
                    ) : ""}
                </div>
            </div>
        );
    }

}

export default Detail;
