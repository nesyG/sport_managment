import { Request, Response } from "express";
import User from "../models/users";
const { Sport, ClassTime } = require("../models/sports");

export const mockController = {
    mockData: async (req: Request, res: Response) => {
        try {
            if (req.params.type == "create") {
                const sportsList: Array<string> = ['Boxing', 'Basketball', 'Cycling', 'Baseball', 'Football', 'Fitness', 'Golf', 'Running', 'Swimming', 'Tennis', 'Triathlon', 'Volleyball']
                for (let sportName in sportsList) {
                    const sportDocument = new Sport({
                        sport: sportsList[sportName],
                        children: {
                            t1: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t2: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t3: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" })
                        },
                        youth: {
                            t1: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t2: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t3: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" })
                        },
                        youngAdults: {
                            t1: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t2: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t3: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" })
                        },
                        adults: {
                            t1: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t2: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" }),
                            t3: new ClassTime({ day: "Monday", start: "08:00", end: "09:30" })
                        }
                    })
                    sportDocument.save()
                }
                const adminUser: object = {
                    "firstName": "admin",
                    "lastName": "admin",
                    "email": "iness.gvoic@gmail.com",
                    "password": "admin123",
                    "ageGroup": "youth",
                    "sport1": "",
                    "sport2": "",
                    "isVerified": true,
                    "isAdmin": true
                }
                const basicUser: object = {
                    "firstName": "Ines",
                    "lastName": "Gvoic",
                    "email": "igvoic.work@gmail.com",
                    "password": "12345678",
                    "ageGroup": "youth",
                    "sport1": "",
                    "sport2": "",
                    "isVerified": true,
                    "isAdmin": false
                }
                const admin = new User(adminUser);
                await admin.save();

                const user = new User(basicUser);
                await user.save();

                return res.status(200).json({
                    message: "Mock creating completed."
                })
            }
            else if (req.params.type == "delete") {
                await Sport.deleteMany();
                await User.deleteMany();
                return res.status(200).json({
                    message: "Mock deleting completed."
                })
            }
        } catch (err) {
            res.json(err);
        }
    }
}