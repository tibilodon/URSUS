import "./PublicSearchStyles.css";

// import { useState } from "react";

const PublicSearch = ({ handleChange, searchTerm, value, searchResults }) => {
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
          value={searchTerm || value}
          onChange={handleChange || searchResults}
        />
      </div>
    </>
  );
};

export default PublicSearch;
