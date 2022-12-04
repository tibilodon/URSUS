import "./PublicSearchStyles.css";

import { useState } from "react";

const PublicSearch = () => {
  const [search, setSearch] = useState();
  return (
    <>
      <div className="search-wrap">
        <input
          onChange={e => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="search"
        />
      </div>
    </>
  );
};

export default PublicSearch;
