import axios from "axios";
import React, {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import sportImg from "../assets/images/sport1.jpg";
import "./Classes.css";
import Schedule from "./Schedule";

const Classes = ({  getToken }: any) => {
  const navigate = useNavigate();
//state for cards color change
  const [clickedSports, setClickedSports] = useState<boolean>(false)



  const [data, setData] = useState<[]>([]);
  const [sports, setSports] = useState([]);
 

  //Get sport names from DB on first render
   const [sportNames, setSportNames] = useState<string[]>([])
  
   useEffect(()=> {
    fetch("http://localhost:3500/sports")
      .then(res => res.json())
      .then(data => setSportNames(data))
    }, []) 

  //state change for clicked sports
  const [selectedSports, setSelectedSports] = useState<any>([]);

  function handleClick(name: any) {
    if (selectedSports.includes(name) == false) {
      return setSelectedSports((prev:any)=> [...prev, name])
    } else if (selectedSports.includes(name)) {
      setSelectedSports((prev:any)=> {
        let myIndex = selectedSports.indexOf(name)
        let newData = prev.slice()
        newData.splice(myIndex, 1)
        return(newData)
    })
    }}
    console.log(selectedSports)

//state change for clicked age group
const ageGroup: Array<string> = [
  "children",
  "youth",
  "youngAdults",
  "adults",
];
const [clickedAge, setClickedAge] = useState<string[]>([])

  function handleAgeClick(age: any) {
    if (clickedAge.includes(age) == false) {
      return setClickedAge((prev:any)=> [...prev, age])
    } else if (clickedAge.includes(age)) {
      setClickedAge((prev:any)=> {
        let myIndex = clickedAge.indexOf(age)
        let newData = prev.slice()
        newData.splice(myIndex, 1)
        return(newData)
      })
    }
  }

  //api call
  let sportsUrl = `http://localhost:3500/classes?sports=${selectedSports}&ageGroups=${clickedAge}`;
  async function getSelectedSports() {
    const response = await fetch(sportsUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.token}`,
      },
    })
      .then((res) => res.json())
      .then(setData);
  }

  //rendering
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
      <div className="schedule-container" >
        <div className="age-schedule">
      <div className="age-section">
        {ageGroup.map((item) => {
          return (
            <div
            key={item}
              onClick={()=> handleAgeClick(item)}
              className={clickedAge.includes(item) ? 'age-active' : 'main-section'}
            >
              {item}
            </div>
          );
        })}
        </div>
        <div className="schedule"><p>Schedule</p></div>
        </div>
        <div className="sports-section">
        {sportNames.length && sportNames.map((item:any) => {return (
        <div 
        onClick={()=> handleClick(item)}
        className={selectedSports.includes(item) ? 'sport-active' : 'sport-card'} >{item.sport}
        </div>)}) }
        </div>
        </div>
        <button
          type="submit"
          onClick={getSelectedSports}
          className="submit-sport-btn"
        >
          Search Sports
        </button>
      
      
    </div>
  );
};

export default Classes;
