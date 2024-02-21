import { useContext } from 'react';

import { SearchContext } from '../../App';

import classes from './index.module.scss';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <input
      className={classes.root}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      type="text"
      placeholder="Поиск пиццы ...."
    />
  )
}

export default Search;