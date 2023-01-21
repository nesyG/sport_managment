import axios from "axios";
import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import sportImg from "../assets/images/sport1.jpg";
import "./Classes.css";
import Schedule from "./Schedule";

const Classes = ({ selectedAgeGroup, setSelectedAgeGroup, getToken }: any) => {
  const navigate = useNavigate();
  const [data, setData] = useState<[]>([]);
  const [sports, setSports] = useState([]);
  const ageGroup: Array<string> = [
    "children",
    "youth",
    "youngAdults",
    "adults",
  ];

  //Get sport names from DB on first render
   const [sportNames, setSportNames] = useState<string[]>([])
   let test: string[] = []

    const fetchSports = async () => {
      const response = await fetch("http://localhost:3500/sports");
      const newData = await response.json();
      let getSportNames = newData.map((item: any) => {
        test.push(item.sport)
      });
      setSportNames(test)
    };

    fetchSports();
 
    console.log(sportNames);

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  // const [selectedAgeGroup, setSelectedAgeGroup] = useState<string[]>([])

  let sportsUrl = `http://localhost:3500/classes?sports=${selectedSports}&ageGroups=${selectedAgeGroup}`;

 
  function handleClick(name: any) {
    setSelectedSports((prev) => [...prev, name]);
  }

  function handleAgeClick(age: any) {
    setSelectedAgeGroup((prev: any) => [...prev, age]);
  }

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
        <div>Basketball </div>
        { () => {
          if (test.length) {
            return <div>{sportNames}</div>;
          } else {
            return null;
          }}
        } 
        {ageGroup.map((item) => {
          return (
            <div
              onClick={() => handleAgeClick(item)}
              className="main-section"
              key={item}
            >
              {item}
            </div>
          );
        })}
        <button
          type="submit"
          onClick={getSelectedSports}
          className="submit-sport-btn"
        >
          Search Sports
        </button>
      </div>
      
    </div>
  );
};

export default Classes;
