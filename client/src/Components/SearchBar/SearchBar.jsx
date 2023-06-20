import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeName, getAllRecipes } from '../../Redux/action';
import style from "./SearchBar.module.css"

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);

    if (inputValue.trim().length <= 1) {
      dispatch(getAllRecipes());
    } else {
      dispatch(getRecipeName(inputValue));
    }
  };

  return (
    <div>
        <input
          type='text'
          onChange={handleChange}
          value={input}
          placeholder="Buscar por nombre"
          className={style.input}
          required

        />
    </div>
  );
};

export default SearchBar;


