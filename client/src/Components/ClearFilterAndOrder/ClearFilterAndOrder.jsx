import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, setOrder } from '../../Redux/action';
import style from './ClearFilterAndOrder.module.css';

const ClearFilterAndOrder = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setFilter({ diets: 'all', origin: 'all', healthScore:0 }));
    dispatch(setOrder({ orderType: '' }));

  };

  return (
    <div className={style.clearFilter}>
      <button className={style.clearButton} onClick={handleClick}>
        Clear All
      </button>
    </div>
  );
};

export default ClearFilterAndOrder;
