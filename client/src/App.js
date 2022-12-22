import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import Error from "./Pages/Error/Error";
import Landing from "./Pages/Landing/Landing";
import ProtectedRoute from "./Pages/ProtectedRoute";
import AddRecipe from "./Pages/Shared/AddRecipe/AddRecipe";
import SharedLayout from "./Pages/Shared/SharedLayout";
import FetchAllContainer from "./Pages/Shared/FetchedAll/FetchAllContainer";
import PublicNavTest from "./Components/Navbar/PublicNavbar/PublicNavTest";
import AuthLogin from "./Pages/Auth/Login/AuthLogin";
import AuthReg from "./Pages/Auth/Login/AuthReg";
import PublicCardHolder from "./Pages/Shared/PublicCardHolder/PublicCardHolder";
import NewProfile from "./Pages/Shared/Profile/NewProfile";
import MemberCardHolder from "./Pages/Shared/MemberCardHolder/MemberCardHolder";

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
            <Route index element={<MemberCardHolder />} />
            <Route path="profile" element={<NewProfile />} />
            <Route path="add-recipe" element={<AddRecipe />} />
            <Route
              path="all-recipes"
              element={
                <>
                  <FetchAllContainer />
                </>
              }
            />
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
              </>
            }
          />
          {/*TODO:---TEST---*/}
          {/* <Route
            path="/test"
            element={
              <>
                <NewAdd />
              </>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
