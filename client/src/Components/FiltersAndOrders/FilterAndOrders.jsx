import FilterBar from "../../Components/FilterBar/FilterBar";
import OrderBar from "../../Components/OrderBar/OrderBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ClearFilterAndOrder from "../../Components/ClearFilterAndOrder/ClearFilterAndOrder";
import style from "./FilterAndOrders.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setViewFilterAndOrder } from '../../Redux/action';

const FilterAndOrders = () => {

    const filters = useSelector((state) => state.filters);
    const allRecipes = useSelector((state) => state.allRecipes);
    const nameSearched = useSelector((state) => state.nameSearched);
    const order = useSelector((state) => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setViewFilterAndOrder());
    }, [filters.diets, filters.origin, allRecipes, nameSearched,order]);

    return (

        <div className={style.Contenedor}> 
            <SearchBar />
            <FilterBar />
            <OrderBar />
            <ClearFilterAndOrder />
        </div>

    );
};

export default FilterAndOrders;
