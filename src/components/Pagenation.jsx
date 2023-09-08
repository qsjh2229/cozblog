import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({ currentPage, numberOfPages, onClick , limit}) => {
   const currentSet= Math.ceil(currentPage /limit) 
   const startPage=limit *(currentSet - 1) +1
   console.log(startPage)
 
   const lastSet =  Math.ceil(numberOfPages /limit) 
   const numberOfPagesSet = currentSet === lastSet ? numberOfPages%limit : limit
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
   {  currentSet !== 1 &&   <li className="page-item disabled cuser-potiter" onClick={()=>{onClick(startPage - limit)}}>
          <div className="page-link">Previous</div>
        </li>}

        {Array(numberOfPagesSet)
          .fill(startPage)
          .map((value, idx) => value + idx)
          .map((pageNum) => {
            return (
              <li
                key={pageNum}
                className={`page-item ${currentPage === pageNum ? 'active' : ''}`}

              >
                <div
                  className="page-link cuser-potiter"
                  onClick={() => {
                    onClick(pageNum);
                  }}
                >
                  {pageNum}
                </div>
              </li>
            );
          })}

      { currentSet !== lastSet &&  <li className="page-item">
          <div className="page-link cuser-potiter" href="#" onClick={()=>{onClick(startPage + limit)}}>
            Next
          </div>
        </li>}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  numberOfPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  limit: PropTypes.number
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5,
};

export default Pagination;
