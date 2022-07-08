import React from 'react';

export default function Rating({ rating }) {
  return (
    <>
      {rating > 1 ? (
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating > 0.5 ? (
        <span>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : (
        <span>
          <i className="fa-regular fa-star"></i>
        </span>
      )}
      {rating > 2 ? (
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating > 1.5 ? (
        <span>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : (
        <span>
          <i className="fa-regular fa-star"></i>
        </span>
      )}
      {rating > 3 ? (
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating > 2.5 ? (
        <span>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : (
        <span>
          <i className="fa-regular fa-star"></i>
        </span>
      )}
      {rating > 4 ? (
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating > 3.5 ? (
        <span>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : (
        <span>
          <i className="fa-regular fa-star"></i>
        </span>
      )}
      {rating > 5 ? (
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating > 4.5 ? (
        <span>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : (
        <span>
          <i className="fa-regular fa-star"></i>
        </span>
      )}
    </>
  );
}
