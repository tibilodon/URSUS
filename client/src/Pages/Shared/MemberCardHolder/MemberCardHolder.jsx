import "./MemberCardHolderStyles.css";
import React from "react";
import NewPagination from "../../../Components/Pagination/NewPagination";
import SearchNot from "../../../Components/Alert/SearchNot";
import Loader from "../../../Components/Loader/Loader";
import { useAppContext } from "../../../Context/appContext";

const MemberCardHolder = () => {
  const { numOfPages } = useAppContext();
  return (
    <>
      {/* {numOfPages >= 1 && ( */}
      <div className="paggi">
        <NewPagination />
      </div>
      {/* )} */}
    </>
  );
};

export default MemberCardHolder;
