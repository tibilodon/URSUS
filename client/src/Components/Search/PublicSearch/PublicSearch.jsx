import "./PublicSearchStyles.css";

// import { useState } from "react";

const PublicSearch = ({ handleChange, searchTerm }) => {
  // const [search, setSearch] = useState();
  return (
    <>
      <div className="search-wrap">
        <input
          // onChange={e => {
          //   setSearch(e.target.value);
          // }}
          type="text"
          placeholder="search"
          name="search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default PublicSearch;
