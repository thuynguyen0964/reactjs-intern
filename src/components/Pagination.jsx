import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import '../css/Pagination.css';

const Pagination = ({ ...props }) => {
  return (
    <ReactPaginate
      className='react-paginate flex gap-3'
      nextLabel='Next'
      onPageChange={props.clicked}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={props.count}
      previousLabel='Prev'
      previousClassName='previous'
      nextClassName='next'
      breakLabel='...'
      breakClassName='break'
      containerClassName='pagination'
      activeClassName='selected'
      renderOnZeroPageCount={null}
    />
  );
};

Pagination.propTypes = {
  clicked: PropTypes.func,
  count: PropTypes.number,
};

export default Pagination;
