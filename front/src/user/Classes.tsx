import React, { FunctionComponent, useContext} from "react";
import { JWTContext } from "../App";



const Classes: FunctionComponent = () => {
  const jwt = useContext(JWTContext)
  return(
    <div>Hello {jwt}</div>
  )
  };

  export default Classes;