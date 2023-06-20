import FilterBar from "../../Components/FilterBar/FilterBar";
import OrderBar from "../../Components/OrderBar/OrderBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ClearFilterAndOrder from "../../Components/ClearFilterAndOrder/ClearFilterAndOrder";
import style from "./FilterAndOrders.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setViewFilterAndOrder } from '../../Redux/action';
// Corregir el nombre de importación

const FilterAndOrders = () => {

    const diets = useSelector((state) => state.diets);
    const filters = useSelector((state) => state.filters);
    const allRecipes = useSelector((state) => state.allRecipes);
    const nameSearched = useSelector((state) => state.nameSearched);
    const order = useSelector((state) => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setViewFilterAndOrder());
    }, [filters.diets, filters.origin, allRecipes, nameSearched,order]);

    return (

        <div className={style.Contenedor}> {/* Corregir el nombre de la clase */}
            <SearchBar />
            <FilterBar />
            <OrderBar />
            <ClearFilterAndOrder />
        </div>

    );
};

export default FilterAndOrders;
