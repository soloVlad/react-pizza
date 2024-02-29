import ReactPaginate from "react-paginate";

import classes from './index.module.scss';

const Pagination = ({ currentPage, onPageChange }) => {
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
      forcePage={currentPage - 1}
    />
  )
}

export default Pagination;