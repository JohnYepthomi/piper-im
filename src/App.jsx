import "./App.css";
import Home from "./pages/home";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import _ from "lodash";


const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<PrivateRoute />}>
        <Route exact path="/home" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );

  // return (
  //   <Routes location={location} key={location.pathname}>
  //     <Route exact path="/home" element={<Home />} />
  //     <Route path="/" element={<Login />} />
  //   </Routes>
  // );
};

export default App;
