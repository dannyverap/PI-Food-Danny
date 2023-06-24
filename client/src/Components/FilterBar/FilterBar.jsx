import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../Redux/action';
import style from './FilterBar.module.css';

const FilterBar = () => {
  const diets = useSelector((state) => state.diets);
  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();


  const handleChangeDiet = (event) => {
    const selectedDiet = event.target.value;
    dispatch(setFilter({ diets: selectedDiet }));
  };

  const handleChangeOrigin = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(setFilter({ origin: selectedOrigin }));
  };

  const handleHealthScore = (event) => {
    const selectedHealthScore = event.target.value;
    dispatch(setFilter({ healthScore: selectedHealthScore }));
  };

  return (
    <div className={style.filterBar}>
      <span className={style.filterLabel}>Filter by </span>

      <select className={style.select} onChange={handleChangeOrigin} value={filters.origin}>
        <option value={'all'}>All Origens</option>
        <option value={'api'}>API</option>
        <option value={'db'}>Creados</option>
      </select>

      <select className={style.select} onChange={handleChangeDiet} value={filters.diets}>
        <option value={'all'}>All Diets</option>
        {diets.map((diet) => (
          <option value={diet.name} key={diet.name}>
            {diet.name[0].toUpperCase() + diet.name.slice(1)}
          </option>
        ))}
      </select>

      <select className={style.select} onChange={handleHealthScore} value={filters.healthScore}>
        <option value={0}>HealthScore</option>

        <option value={75}>
          Mayor a 75
        </option>
        <option value={50}>
          Mayor a 50
        </option>
        <option value={25}>
          Mayor a 25
        </option>
        
      </select>

    </div>
  );
};

export default FilterBar;
