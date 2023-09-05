import { Route, Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./app.scss";
import routs from "./routs"
import Navbar from "./components/Navbar";


function App() {

  return (
    <>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="container">
        <Routes>
          {routs.map((item) => {
            return <Route key={item.path} path={item.path} element={item.component} />;
          })}
        </Routes>
      </div>
    </>
  );
}

export default App;
