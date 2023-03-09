import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center my-4">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-l"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`py-2 px-4 mx-2 ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-blue-900"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-r"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
