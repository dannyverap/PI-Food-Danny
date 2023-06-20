import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setOrder, setViewFilterAndOrder } from '../../Redux/action';
import style from './OrderBar.module.css';

const OrderBar = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    dispatch(setOrder({ orderType: selectedOrder }));
  };

  return (
    <div className={style.orderBar}>
      <span className={style.orderLabel}>Ordenar por </span>

      <select className={style.select} onChange={handleOrderChange} value={order.orderType}>
        <option value={''}>...</option>
        <option value={'menor-health-score'}>Menor health Score</option>
        <option value={'mayor-health-score'}>Mayor health Score</option>
        <option value={'orden-za'}>Orden Z-A</option>
        <option value={'orden-az'}>Orden A-Z</option>
      </select>
    </div>
  );
};

export default OrderBar;
