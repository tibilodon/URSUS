import { BrowserRouter, Route, Routes } from "react-router-dom";
//Pages
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error/Error";
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
