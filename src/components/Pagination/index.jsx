import ReactPaginate from "react-paginate";

import classes from './index.module.scss';

const Pagination = ({ onPageChange }) => {
  return (
    <ReactPaginate
      className={classes.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination;