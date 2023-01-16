import React, { FunctionComponent, useContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "./Header"

// interface blabla {
//     data: []
//     }

const Schedule = ({data}:any) => {
    return (
        <div>
            <h1>Hy</h1> 
            {data[0].sport}
        </div>
    )
}

export default Schedule