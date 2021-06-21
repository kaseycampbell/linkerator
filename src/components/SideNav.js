import React from "react";
import "../css/SideNav.css";

// contains search bar with search button and all tags

const SideNav = ({ setShowAddModal }) => {
  const handleClick = () => {
    setShowAddModal(true);
  };
  return (
    <div id="side__nav">
      <button
        className="button__large"
        id="add__link__button"
        onClick={handleClick}
      >
        Add Link
      </button>
    </div>
  );
};

export default SideNav;
