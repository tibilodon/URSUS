import "./MemberCardHolderStyles.css";
import { useEffect } from "react";
import MemberNewPagination from "../../../Components/Pagination/MemberNewPagination";
import SearchNot from "../../../Components/Alert/SearchNot";
import Loader from "../../../Components/Loader/Loader";
import { useAppContext } from "../../../Context/appContext";
import MemberCardContainer from "../Container/MemberCardContainer";
import BgWrap from "../../../Components/BgWrap";

const MemberCardHolder = () => {
  const { numOfPages, getRecipes, recipes } = useAppContext();
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <>
      {/* {numOfPages >= 1 && ( */}
      <BgWrap>
        <div className="paggi">{numOfPages > 1 && <MemberNewPagination />}</div>
        <MemberCardContainer />
        {/* )} */}
      </BgWrap>
    </>
  );
};

export default MemberCardHolder;
