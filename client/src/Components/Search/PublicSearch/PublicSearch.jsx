import "./PublicSearchStyles.css";
import collapseIco from "../../../Assets/collapse_ico.svg";
import searchIcoMobile from "../../../Assets/search_ico.svg";

const PublicSearch = ({
  handleChange,
  searchTerm,
  value,
  searchResults,
  collapse,
}) => {
  return (
    <>
      <div className="search-wrap">
        <div className="mobile-collapse">
          <img onClick={collapse} src={collapseIco} alt="" />
        </div>
        <input
          type="text"
          placeholder="search"
          name="search"
          value={searchTerm || value}
          onChange={handleChange || searchResults}
        />
        <img className="mobileIco" src={searchIcoMobile} alt="" />
      </div>
    </>
  );
};

export default PublicSearch;
