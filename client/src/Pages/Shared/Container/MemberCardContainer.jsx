import "./MemberCardContainerStyles.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import MemberCard from "../../../Components/Card/MemberCard";
import Loader from "../../../Components/Loader/Loader";
import SearchNot from "../../../Components/Alert/SearchNot";

const MemberCardContainer = () => {
  const {
    getRecipes,
    recipes,
    isLoading,
    page,
    totalRecipes,
    search,
    searchType,
    searchDifficulty,
    imgRef,
    imgURL,
    sort,
  } = useAppContext();

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, [
    search,
    searchType,
    searchDifficulty,
    sort,
    page,
    totalRecipes,
    imgRef,
    imgURL,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (recipes.length === 0) {
    return (
      // <div className="no-recipe-found">
      //   <h1>Nincs találat</h1>
      // </div>
      <SearchNot />
    );
  }
  return recipes.map(recipe => {
    return (
      <div key={recipe._id} className="card-holder-card-wrap">
        <MemberCard {...recipe} />
      </div>
    );
  });
};

export default MemberCardContainer;
