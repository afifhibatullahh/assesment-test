import React from "react";

const Paginate = ({ onPrev, onNext, data }) => {
  const { total, page } = data;
  return (
    <div className="join grid grid-cols-2">
      <button
        disabled={page === 1}
        className="join-item btn btn"
        onClick={onPrev}
      >
        Previous
      </button>
      <button
        disabled={total <= page * 10}
        className="join-item btn btn"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default Paginate;
