import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import Error from "./Pages/Error/Error";
import Landing from "./Pages/Landing/Landing";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Register from "./Pages/Register/Register";
import AddRecipe from "./Pages/Shared/AddRecipe/AddRecipe";
import SharedLayout from "./Pages/Shared/SharedLayout";
import Profile from "./Pages/Shared/Profile/Profile";
import AllRecipesContainer from "./Pages/Shared/AllRecipes/AllRecipesContainer";
import PublicRecipeContainer from "./Components/Recipe/PublicFetch/PublicRecipeContainer";
import FetchAllContainer from "./Pages/Shared/FetchedAll/FetchAllContainer";
import PublicNavbar from "./Components/Navbar/PublicNavbar/PublicNavbar";
import PublicLanding from "./Pages/Shared/publicLanding/PublicLanding";
import PublicNavTest from "./Components/Navbar/PublicNavbar/PublicNavTest";
import AuthLogin from "./Pages/Auth/Login/AuthLogin";
import AuthReg from "./Pages/Auth/Login/AuthReg";
import BgWrap from "./Components/BgWrap";
import PublicCardHolder from "./Pages/Shared/PublicCardHolder/PublicCardHolder";
import Card from "./Components/Card/Card";
import NewProfile from "./Pages/Shared/Profile/NewProfile";
import SearchNot from "./Components/Alert/SearchNot";
import MemberNav from "./Components/Navbar/MemberNav/MemberNav";
import MemberCardHolder from "./Pages/Shared/MemberCardHolder/MemberCardHolder";
import NewPagination from "./Components/Pagination/NewPagination";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <MemberCardHolder />
                // <AllRecipesContainer />
              }
            />
            <Route
              path="profile"
              element={
                // <Profile />
                <NewProfile />
              }
            />
            <Route path="add-recipe" element={<AddRecipe />} />
            {/*TODO: --TEST--LOGGED IN----*/}
            {/* <Route path="test" element={<PublicLanding />} /> */}
            {/* TODO: --TEST-- LOGGED IN*/}
            <Route path="all-recipes" element={<FetchAllContainer />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route
            path="/register"
            element={
              <>
                <PublicNavTest />
                <AuthReg />
              </>
            }
          />{" "}
          <Route
            path="/login"
            element={
              <>
                <PublicNavTest />
                <AuthLogin />
              </>
            }
          />
          <Route path="*" element={<Error />} />
          <Route
            path="/public"
            element={
              <>
                <PublicCardHolder />

                {/* <PublicNavbar />
                <FetchAllContainer /> */}
              </>
            }
          />
          {/*TODO:  -----PUBLIC TEST----- */}
          <Route
            path="/test"
            element={
              <>
                <NewPagination />
              </>
            }
          />
          {/*TODO:  -----PUBLIC TEST----- */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
