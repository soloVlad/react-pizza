import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';

import classes from './index.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const updateSearchValue = useCallback(debounce((value) => {
    dispatch(setSearchValue(value));
  }, 300), []);

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <input
      className={classes.root}
      value={value}
      onChange={onChangeInput}
      type="text"
      placeholder="Поиск пиццы ...."
    />
  )
}

export default Search;