import { Request, Response } from "express";
const { Sport, ClassTime } = require("../models/sports");

export const sportsController = {
getSportsAsAdmin: async (req: Request, res: Response) => {
    try {
      let response;
      if (!req.query.sports) {
        response = await Sport.find().lean();
      } else {
        let sportsList: string[] = (req.query.sports as string).split(",");
        response = await Sport.find({ sport: sportsList }).lean();
      }
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
}