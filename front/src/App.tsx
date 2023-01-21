import React, { createContext, FunctionComponent, useEffect, useState} from "react";
import handlePost from "./auth/Login";
import Login from "./auth/Login";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Header from "./user/Header";
import Classes from "./user/Classes";
import Schedule from "./user/Schedule";


// export interface State {
//   bla: any
// }

// type Props1 = {
//   setData: React.Dispatch<React.SetStateAction<any>>;
// };

// type Props2 = {
//   data: React.Dispatch<React.SetStateAction<any>>;
// };
  
const App: React.FC = () => {
  const [data,setData] = useState<[] | null>(null)
  const [getToken, setGetToken] = useState<string>('')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>([])

  function setToken (getToken:any) {
    setGetToken(getToken)
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login setToken = {setToken}/>}/>
        <Route path="/classes" element={<Classes selectedAgeGroup={selectedAgeGroup} setSelectedAgeGroup={setSelectedAgeGroup} setData={setData} getToken={getToken}/>} />

      </Routes>
    </div>
  );
};

export default App;

 
