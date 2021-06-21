import React from "react";
import "../css/SideNav.css";

// contains search bar with search button and all tags

// const SideNav = ({ setShowAddModal }) => {
//   const handleClick = () => {
//     setShowAddModal(true);
//   };
//   return (
//     <div id="side__nav">
//       <button
//         className="button__large"
//         id="add__link__button"
//         onClick={handleClick}
//       >
//         Add Link
//       </button>
//     </div>
//   );
// };


const SideNav = ({
  search,
  setSearch,
  searchOption,
  setSearchOption,
  sortOption,
  setSortOption,
  links,
  setLinks,
}) => {
  return (
    <>
      <div className="search-bar">
        <div id="search">
          <label htmlFor="keywords">Search by Term</label>
          <input
            id="keywords"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <select
            className="search-select"
            value={searchOption}
            onChange={(event) => {
              setSearchOption(event.target.value);
            }}
          >
            [<option value="Links">Links</option>
            <option value="Tags">Tags</option>]
          </select>
        </div>
      </div>
      <div className="sortByClicks">
        <label>Sort By Click Count:</label>
        <select
          className="sort-select"
          value={sortOption}
          onChange={(event) => {
            setSortOption(event.target.value);

            if (event.target.value === "Highest") {
              let sortedHighest = links.sort((a, b) =>
                a.clickcount > b.clickcount ? -1 : 1
              );
              setLinks(sortedHighest);
            } else {
              let sortedLowest = links.sort((a, b) =>
                a.clickcount > b.clickcount ? 1 : -1
              );
              setLinks(sortedLowest);
            }
          }}
        >
          [<option value="Highest">Highest</option>
          <option value="Lowest">Lowest</option>]
        </select>
      </div>
    </>
  );



export default SideNav;
