import { useCallback, useContext, useState } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import classes from './index.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);

  const updateSearchValue = useCallback(debounce((value) => {
    setSearchValue(value);
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