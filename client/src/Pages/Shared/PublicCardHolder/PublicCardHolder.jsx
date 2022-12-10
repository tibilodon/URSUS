import "./PublicCardHolderStyles.css";

import { useEffect, useState } from "react";
import BgWrap from "../../../Components/BgWrap";
import Card from "../../../Components/Card/Card";
import PublicNavTest from "../../../Components/Navbar/PublicNavbar/PublicNavTest";
import NewPagination from "../../../Components/Pagination/NewPagination";
import bgImg from "../../../Assets/bg-img.jpg";
import { useAppContext } from "../../../Context/appContext";

const PublicCardHolder = () => {
  const { allRecipes, fetchAll } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const results = allRecipes.filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  //get posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const prevPage = pageNumbers => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      // newPage = pageNumbers;
      newPage = 1;
    }
    setCurrentPage(newPage);
  };

  const nextPage = pageNumbers => {
    let newPage = currentPage + 1;

    if (newPage > pageNumbers) {
      newPage = pageNumbers;
      //you can jump to the first page with this option:
      // newPage = 1;
      // setCurrentPage(newPage);
    }
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <PublicNavTest />
      <BgWrap>
        <NewPagination />

        {results &&
          currentPosts.map(recipe => {
            return (
              <div key={recipe.createdAt} className="card-holder-card-wrap">
                {/* <Card /> */}
                <Card recipe={recipe} />
              </div>
            );
          })}
        {/* <div className="card-holder-card-wrap">
          <Card />

        </div> */}
      </BgWrap>
    </>
  );
};

export default PublicCardHolder;
