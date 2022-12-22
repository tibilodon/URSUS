import "./MemberCardHolderStyles.css";
import { useEffect } from "react";
import MemberNewPagination from "../../../Components/Pagination/MemberNewPagination";
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
      <BgWrap>
        <MemberCardContainer />

        <div className="paggi">
          {numOfPages > 1 && (
            <>
              <div className="paggi-z-index">
                <MemberNewPagination />
              </div>
            </>
          )}
        </div>
      </BgWrap>
    </>
  );
};

export default MemberCardHolder;
