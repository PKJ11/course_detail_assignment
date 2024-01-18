import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        {/* Use Link to enable navigation */}
        <Link to="/" className="header-link">
          <h2>Courses That Are Offered</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;

