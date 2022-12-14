import React, { FunctionComponent, useEffect, useState } from "react";
import Login from "./auth/Login";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Classes from "./User/Classes";

const App: FunctionComponent = () => {
  const [state, setState] = useState([]);
  const test = { item: {} };
  useEffect(() => {
    fetch("http://localhost:3500/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((res) => {
        setState(res);
        console.log(res);
      });
  }, []);

  return (
    <div className="mb-3">
      <Login />
      <Link to={"/classes"}>Home</Link>
      <Routes>
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </div>
  );
};

export default App;
