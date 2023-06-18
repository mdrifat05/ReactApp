import React, { useState, useEffect } from "react";

function Pagination({ currentPage, totalPageCount, handlePageChange }) {
  const [paginationElements, setPaginationElements] = useState([]);

  useEffect(() => {
    generatePagination(currentPage, totalPageCount);
  }, [currentPage, totalPageCount]);

  function onClickForPrev() {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }

  function onClickForNext() {
    if (currentPage < totalPageCount) {
      handlePageChange(currentPage + 1);
    }
  }

  function onClickForRandom(page) {
    handlePageChange(page);
  }

  function generatePagination(currentPage, totalPageCount) {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPageCount);

    const paginationElements = [];

    if (currentPage > 1) {
      paginationElements.push(
        <li className="page-item" key="prev">
          <button className="page-link" onClick={onClickForPrev}>
            «
          </button>
        </li>
      );
    }

    if (startPage > 1) {
      paginationElements.push(
        <li
          className="page-item"
          key="first"
          onClick={() => onClickForRandom(1)}
        >
          <button className="page-link" data-page="1">
            1..
          </button>
        </li>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      if (page === currentPage) {
        paginationElements.push(
          <li className="page-item active" key={page}>
            <span className="page-link">{page}</span>
          </li>
        );
      } else {
        paginationElements.push(
          <li
            className="page-item"
            key={page}
            onClick={() => onClickForRandom(page)}
          >
            <button className="page-link" data-page={page}>
              {page}
            </button>
          </li>
        );
      }
    }

    if (endPage < totalPageCount) {
      paginationElements.push(
        <li
          className="page-item"
          key="last"
          onClick={() => onClickForRandom(totalPageCount)}
        >
          <button className="page-link" data-page={totalPageCount}>
            ..{totalPageCount}
          </button>
        </li>
      );
    }

    if (currentPage < totalPageCount) {
      paginationElements.push(
        <li
          className="page-item"
          key="next"
          onClick={() => onClickForNext()}
        >
          <button className="page-link" data-page={totalPageCount}>
            »
          </button>
        </li>
      );
    }

    setPaginationElements(paginationElements);
  }

  return (
    <div>
      <div className="pagination h-100 d-flex align-items-center justify-content-center">
        <ul className="pagination">{paginationElements}</ul>
      </div>
    </div>
  );
}

export default Pagination;
