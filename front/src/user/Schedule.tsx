import { setPriority } from "os";
import { off } from "process";
import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "./Header"
import './Schedule.css'


const Schedule = ({ data, selectedAgeGroup }: any) => {
    // Array holding all the classes, sorted by day of the week
    let allClasses: any = { Monday: [], Tuesday: [], Wedensday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] }

    for (let classes of data) {
        for (let ageGroup in selectedAgeGroup) {
            // We don't need class_users here
            delete classes[selectedAgeGroup[ageGroup]].class_users
            let singleClassesArray = classes[selectedAgeGroup[ageGroup]]

            // Parse data for every single class and store it in allClasses Object for easier rendering
            for (let single_class in singleClassesArray) {
                if (singleClassesArray[single_class].start != '' && singleClassesArray[single_class].end != '') {
                    allClasses[singleClassesArray[single_class].day].push({
                        sport: classes.sport,
                        ageGroup: selectedAgeGroup[ageGroup],
                        start: singleClassesArray[single_class].start,
                        end: singleClassesArray[single_class].end
                    })
                }
            }
        }
    }
    console.log(allClasses)
    const weekDays: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <div>
            <h1>Weekly schedules</h1>
            <div>{ }</div>
        </div>
    )
}

export default Schedule

{/* <div>{weekDays.forEach(x => {
                                const asArray = Object.entries(item);
                                let result = asArray.filter((y:any) => {item[ageGroup].t1.day === x})
                                if (result.length) {
                                    <h3>{result}</h3>
                                } else {
                                    <h3>No data in variable</h3>
                                }
                                console.log(result)
                            })}</div> */}