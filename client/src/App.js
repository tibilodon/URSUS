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
            {/*TODO: --TEST--*/}
            {/* <Route path="test" element={<AllRecipesContainer />} /> */}
            {/*TODO: --TEST--*/}
            <Route path="all-recipes" element={<FetchAllContainer />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
