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
            <Route index element={<AllRecipesContainer />} />
            <Route path="profile" element={<Profile />} />
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
          <Route path="/login" element={<AuthLogin />} />
          <Route path="*" element={<Error />} />
          <Route
            path="/public"
            element={
              <>
                <PublicNavbar />
                <FetchAllContainer />
              </>
            }
          />
          {/*TODO:  -----PUBLIC TEST----- */}
          <Route
            path="/test"
            element={
              <>
                {/* <BgWrap>
                  <PublicNavTest />
                </BgWrap> */}
                {/* <PublicCardHolder /> */}
                <PublicNavTest />
                <NewProfile />
              </>
            }
          />
          <Route
            path="/testCard"
            element={
              <>
                {/* <BgWrap>
                  <PublicNavTest />
                </BgWrap> */}
                <Card />
              </>
            }
          />
          <Route path="/registerTest" element={<AuthReg />} />
          <Route path="/loginTest" element={<AuthLogin />} />
          {/*TODO:  -----PUBLIC TEST----- */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
