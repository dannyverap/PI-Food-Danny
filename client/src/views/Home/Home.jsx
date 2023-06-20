import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes, getAllDiets } from "../../Redux/action";
import FilterAndOrders from "../../Components/FiltersAndOrders/FilterAndOrders";


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDiets());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);



    return (
        <>

            <FilterAndOrders />

            <CardsContainer />
        </>
    );
};

export default Home;
