import "./FetchAllSearchStyles.css";

import InputField from "../../Input/InputField";

const FetchAllSearch = ({
  handleChange,

  handleClearValues,
  searchTerm,
}) => {
  return (
    <>
      <div className="fetch-search-wrap">
        <InputField
          value={searchTerm}
          type="text"
          searchLabel={"keresés"}
          handleChange={handleChange}
          name="search"
        />
        <button onClick={handleClearValues}>CLEAR</button>
      </div>
    </>
  );
};

export default FetchAllSearch;
