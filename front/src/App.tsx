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
  const [data,setData] = useState<[]>([])
  console.log(data)
  // const [token, setToken] = React.useState(null);

  // const handleLogin = async () => {
  //   const token = await handlePost();

  //   setToken(token);
  // };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Classes setData={setData}/>} />
        <Route path="/schedule" element={<Schedule data={data}/>} />
      </Routes>
    
    
    </div>
  );
};

export default App;

 
