import { useState, useEffect } from "react";
import axios from "axios";
import { getAllDiets } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { useNavigate } from 'react-router-dom'
import style from "./Form.module.css"

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const recipes = useSelector((state) => state.allRecipes);

    useEffect(() => {
        const fetchDiets = async () => {
            if (diets.length === 0) {
                dispatch(getAllDiets());
            }
        };

        fetchDiets();
    }, [diets.length, dispatch]);

    const [form, setForm] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
    });

    const [error, setError] = useState({});

    function handleSelect(event) {
        if (event.target.checked) {
            setForm({
                ...form,
                diets: [...form.diets, event.target.value],
            });
            setError(
                validation(
                    {
                        ...form,
                        diets: [...form.diets, event.target.value],
                    },
                    recipes
                )
            );
        } else if (!event.target.checked) {
            setForm({
                ...form,
                diets: form.diets.filter((diet) => diet !== event.target.value),
            });
            setError(
                validation(
                    {
                        ...form,
                        diets: form.diets.filter((element) => element !== event.target.value),
                    },
                    recipes
                )
            );
        }
    }

    
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
        setError(
            validation(
                {
                    ...form,
                    [event.target.name]: event.target.value,
                },
                recipes
            )
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Agrega el código adicional necesario para manejar la respuesta del servidor

        if (Object.entries(error).length === 0) {
            const response = axios.post(`http://localhost:3001/recipes/`, form);
            
            navigate('/home')
            alert("se agregó correctamente")
            return response;
        }
        alert("Por favor, levanta las observaciones");
    };

    return (
        <form className={style.formContainer} onSubmit={handleSubmit}>
            <div>
                <h1>¡Crea tu propia receta!</h1>
                <label className={style.label}>Name</label>
                <input
                    type="text"
                    value={form.name}
                    name="name"
                    onChange={handleChange}
                    className={style.input}
                />
                {error.name ? <span className={style.error}>*{error.name}</span> : ""}
            </div>

            <div>
                <label className={style.label}>Summary</label>
                <textarea
                    type="text"
                    value={form.summary}
                    name="summary"
                    onChange={handleChange}
                    className={style.textarea}
                />
                {error.summary ? <span className={style.error}>*{error.summary}</span> : ""}
            </div>

            <div>
                <label className={style.label}>Health score</label>
                <input
                    type="number"
                    value={form.healthScore}
                    name="healthScore"
                    onChange={handleChange}
                    className={style.input}
                />
                {error.healthScore ? <span className={style.error}>*{error.healthScore}</span> : ""}
            </div>

            <div>
                <label className={style.label}>Steps</label>
                <textarea
                    type="text"
                    value={form.steps}
                    onChange={handleChange}
                    name="steps"
                    required
                    className={style.textarea}
                />
                {error.steps ? <span className={style.error}>*{error.steps}</span> : ""}
            </div>
            <div>
                <label className={style.label}>Imagen</label>
                <input
                    type="text"
                    value={form.image}
                    name="image"
                    onChange={handleChange}
                    className={style.input}
                />
                {error.image ? <span className={style.error}>*{error.image}</span> : ""}
            </div>

            {diets.map((diet) => (
                <label key={diet.name} className={style.checkboxLabel}>
                    <div>
                        <input
                            type="checkbox"
                            id={diet.name}
                            value={diet.name}
                            onChange={handleSelect}
                            className={style.checkbox}
                        />
                        {diet.name[0].toUpperCase() + diet.name.slice(1)}
                    </div>
                </label>
            ))}
            {error.diets ? <span className={style.error}>{error.diets}</span> : ""}

            <button
                type="submit"
                disabled={
                    !form.name ||
                    !form.summary ||
                    !form.healthScore ||
                    !form.steps ||
                    !form.image ||
                    form.diets.length ===0
                }
                className={style.button}
            >
                ENVIAR
            </button>
        </form>
    );
};

export default Form;

