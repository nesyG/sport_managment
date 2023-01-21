import axios from "axios";
import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "./Header"
import sportImg from "../assets/images/sport1.jpg"
import "./Classes.css"


// type Props1 = {
//   setData: React.Dispatch<React.SetStateAction<[]>>;
// };

const Classes = ({ selectedAgeGroup, setSelectedAgeGroup, setData, getToken }: any) => {
  const navigate = useNavigate()
  const sports: Array<string> = ['Football', 'Basketball', 'Cycling', 'Baseball']
  const ageGroup: Array<string> = ['children', 'youth']

  const [selectedSports, setSelectedSports] = useState<string[]>([])
  // const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>([])

  let sportsUrl = `http://localhost:3500/classes?sports=${selectedSports}&ageGroups=${selectedAgeGroup}`

  // const [data, setData] = useState([]);
  // const theToken = "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGNjM2QxZjg4MTk5MTdmYzc4Yzk1ZCIsImVtYWlsIjoiaWd2b2ljLndvcmtAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSW5lcyIsImxhc3ROYW1lIjoiR3ZvaWMiLCJpYXQiOjE2NzMxMTE1OTZ9.aHGaQNM7LaYXubRBnSZmzx8MRhyo3SWAv5BTV_fJsRw"
  // useEffect(() => {
  //  async function getData () {
  //   const result = await axios.get("http://localhost:3500/classes" )
  //   console.log(result)
  //   return result
  //  } 
  //   getData()
  // }, [])
  // return fetch(url, {
  //   method: 'GET',
  //   headers:{
  //     Accept: 'application/json',
  //              'Content-Type': 'application/json',
  //              'Authorization': "Bearer " + auth,
  //      },
  // })
  //     .then(res => res.json())
  function handleClick(name: any) {
    setSelectedSports((prev) => [...prev, name])
  }

  function handleAgeClick(age: any) {
    setSelectedAgeGroup((prev: any) => [...prev, age])
  }

  async function getSelectedSports() {
    const response = await fetch(sportsUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken.token}`
      },
    })
      .then(res => res.json()).then(setData).then(() => { navigate("/schedule") })
  }
  return (
    <div>
      <Header />
      <p>Hello {getToken.user.firstName}</p>
      {/* <div className="hero-container" style={{ backgroundImage: `url(${sportImg})` }}>
        <p className="sport-text">Welcome to Sport Arena!<br></br>
          Where sport, health and fun combine!<br></br>

          Feel free to click and choose any sport that is of your interest. <br></br>
          Clicking the sport and your age group will show you all the details that you need,<br></br>
          such as short description, as well as week training schedules!
        </p>
      </div> */}
      <div className="list-container">

        {sports.map((item) => {
          return (<div onClick={() => handleClick(item)} className="main-section" key={item}>{item}</div>)
        })}
        {ageGroup.map((item) => {
          return (<div onClick={() => handleAgeClick(item)} className="main-section" key={item}>{item}</div>)
        })}
        <button type="submit" onClick={getSelectedSports} className="submit-sport-btn">Search Sports</button>

      </div>
    </div>
  )
};

export default Classes;