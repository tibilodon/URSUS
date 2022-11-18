import { BrowserRouter, Route, Routes } from "react-router-dom";

//TODO:test
import InputField from "./Components/Input/InputField";
//Pages
import Error from "./Pages/Error/Error";
import Landing from "./Pages/Landing/Landing";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Register from "./Pages/Register/Register";
import AddRecipe from "./Pages/Shared/AddRecipe/AddRecipe";
import SharedLayout from "./Pages/Shared/SharedLayout";
import Profile from "./Pages/Shared/Profile/Profile";
import AllRecipesContainer from "./Pages/Shared/AllRecipes/AllRecipesContainer";
import FetchAll from "./Pages/FetchAll";
import PublicRecipeContainer from "./Components/Recipe/PublicFetch/PublicRecipeContainer";

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
            <Route path="all-recipes" element={<FetchAll />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
          <Route path="/public" element={<PublicRecipeContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
