import React from "react";
import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <nav>
      <div className="navBar">
        <Link className="navLink" to="/Home">
          Home
        </Link>
      </div>
    </nav>
  );
}
