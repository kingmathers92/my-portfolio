import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center my-4">
      {currentPage !== 1 && (
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-l"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`py-2 px-4 mx-2 ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-blue-900 text-white"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage !== totalPages && (
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-r"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
