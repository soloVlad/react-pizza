import classes from './index.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
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