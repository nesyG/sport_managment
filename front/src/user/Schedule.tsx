import React, { FunctionComponent, useContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "./Header"
import './Schedule.css'


const Schedule = ({data}:any) => {
    let item1:any = []
    let item2:any = ''

    function sortData() {
        data.map((item:any) => {
            item1.push(item)
        })
    }
    sortData()
    console.log(item1)
    const weekDays: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 
    return (
        <div>
            <h1>Weekly schedules</h1> 
         <div>{}</div>
        </div>
    )
    }

export default Schedule

 {/* <div>{weekDays.forEach(x => {
                                const asArray = Object.entries(item);
                                let result = asArray.filter((y:any) => {item.children.t1.day === x})
                                if (result.length) {
                                    <h3>{result}</h3>
                                } else {
                                    <h3>No data in variable</h3>
                                }
                                console.log(result)
                            })}</div> */}