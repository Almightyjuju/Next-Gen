import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FeaturedBarber({ barbers }) {
  const barbersPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [barbers]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(barbers.length / barbersPerPage))
    );
  };

  const sortedBarbers = Array.isArray(barbers)
    ? [...barbers].sort((a, b) => a.id - b.id) // Sort by ID in ascending order
    : [];

  const startIndex = (currentPage - 1) * barbersPerPage;
  const endIndex = startIndex + barbersPerPage;
  const paginatedBarbers = sortedBarbers.slice(startIndex, endIndex);

  const featuredBarber = paginatedBarbers[0];

  if (!barbers || barbers.length === 0) {
    return <div>Loading featured barbers...</div>;
  }

  return (
    <div className="featuredContainer">
      <div className="featuredBarberBox">
        <div className="featuredContent">
          {/* Previous Buttons */}
          <button
            className="prevButton"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* Barbers details */}
          <div className="barbersDetails">
            <Link
              to={`barbers/${featuredBarber.id}`}
              className="barberLink"
              style={{ textDecoration: "none" }}
            >
              <h3>{featuredBarber.name}</h3>
              <img src={featuredBarber.image} alt={featuredBarber.name} />
              <p>{featuredBarber.shopNumber}</p>
            </Link>
          </div>

          {/* Next button */}
          <button
            className="nextButton"
            onClick={handleNextClick}
            disabled={
              currentPage === Math.ceil(sortedBarbers.length / barbersPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedBarber;
