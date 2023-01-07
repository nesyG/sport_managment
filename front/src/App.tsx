import React, { createContext, FunctionComponent, useEffect, useState} from "react";
import Login from "./auth/Login";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Classes from "./user/Classes";

export const JWTContext = createContext(null)

const App: FunctionComponent = () => {
const [jwt, setJwt] = useState(null)

  return (
    <div className="mb-3">
      <JWTContext.Provider value={jwt}>
        <Login />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
      </JWTContext.Provider>
    </div>
  );
};

export default App;
