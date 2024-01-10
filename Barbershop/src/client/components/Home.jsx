import React, { useState, useEffect } from "react";
import FeaturedBarber from "./FeaturedBarber";

export default function Home() {
  const [barbersData, setBarbersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const response = await fetch("/api/barbers");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch barbers. Status: ${response.status}`
          );
        }
        const barbers = await response.json();
        setBarbersData(barbers);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchBarbers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Featured Barbers Section */}
      <div className="featuredContainer">
        <div className="featuredBarberBox">
          <FeaturedBarber barbers={barbersData} />
        </div>
      </div>
    </>
  );
}
