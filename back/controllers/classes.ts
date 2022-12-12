import { Request, Response } from "express";
import User from "../models/users";
const { Sport, Reviews, ClassTime } = require("../models/sports");
import getUserId from "../helpers/controllersHelper";

export const classesController = {
  getSelectedSports: async (req: Request, res: Response) => {
    const sportsList: string[] = (req.query.sports as string).split(",");
    const ageGroupsList: string[] = (req.query.ageGroups as string).split(",");

    // Select sport name
    const selector: any = {
      sport: 1,
    };

    // Select classes for each ageGroup
    for (let age in ageGroupsList) {
      selector[ageGroupsList[age]] = 1;
    }

    try {
      const sportCLasses = await Sport.find({ sport: sportsList }, selector);
      if (sportCLasses) {
        return res.status(200).json(sportCLasses);
      }
    } catch (err) {
      console.log(err);
    }
  },
  enrollOrUnenroll: async (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        return res.status(400).json({ message: "Bad token" });
      }

      const userId: string = getUserId(req.headers.authorization);
      const sportName: string = req.params.sport;
      const action: string = String(req.query.action);
      if (!action || (action != "enroll" && action != "unenroll")) {
        return res.status(400).json({message: "Bad Request : Invalid argument (invalid request payload)"});
      }

      if (action === "enroll") {
        //If enroll is true execute enroll function

        //Fetch user and check if he is enrolled in selected sport, check if both of his sports classes are full, if true return, else continue
        const user = await User.findOne({ _id: userId }).lean();
        if (user!.sport1 != "" && user!.sport2 != "") {
          return res.status(400).json({
            message: "You are already enrolled in two sports classes!",
          });
        }

        if (user!.sport1 === sportName || user!.sport2 === sportName) {
          return res
            .status(400)
            .json({ message: "You are already enrolled in this sport!" });
        }

        //Fetch users ageGroup
        let userAgeGroup: string = user!.ageGroup;

        //Check age specific sports class to see if there is space to enroll the user, if sports class is full return error
        const usersArray: string = userAgeGroup + ".class_users";
        const selectedSport = await Sport.findOne({ sport: sportName }).lean();

        const nOfClassUsers: number =
          selectedSport![userAgeGroup].class_users.length;

        let updatedSport;
        if (nOfClassUsers >= 10) {
          return res.status(400).json({ message: "class already full" });
        }
        updatedSport = await Sport.findOneAndUpdate(
          { sport: sportName },
          { $push: { [usersArray]: userId } },
          { new: true }
        ).lean();

        //If all conditions passed, update users sport1 or sport2, whichever is empty
        let updatedUser;
        if (user!.sport1 == "") {
          updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { sport1: sportName },
            { new: true }
          ).lean();
        } else if (user!.sport2 == "") {
          updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { sport2: sportName },
            { new: true }
          ).lean();
        }
        res.status(200).json({
          updatedSport,
          updatedUser,
        });
      }

      // If action is unenroll, this means user will unenroll from sport and below function will run instead
      if (action === "unenroll") {
        // Find user, match selected sport with users sport1 or sport2 property and set it to empty strings
        const userSport: string = req.params.sport;
        const filter: object = { _id: userId };

        const user = await User.findOne({ _id: userId }).lean();
        let update: object;
        if (user!.sport1 == userSport) {
          update = { sport1: "" };
        } else if (user!.sport2 == userSport) {
          update = { sport2: "" };
        } else {
          return res.status(400).json({
            message: "Invalid request, you are not enrolled in this sport!",
          });
        }

        const updatedUser = await User.findOneAndUpdate(filter, update, {
          new: true,
        }).lean();

        // Use users ageGroup, find selected sport and unenroll user from age specific sports class
        const userAge: string = user!.ageGroup;
        const pullUser: string = `${userAge}.class_users`;
        const updatedSport = await Sport.findOneAndUpdate(
          { sport: userSport },
          { $pull: { [pullUser]: userId } },
          { new: true }
        );
        res.status(200).json({
          updatedSport,
          updatedUser,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  commentSport: async (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        return res.status(400).json({ message: "Bad token" });
      }

      const userFeedback = new Reviews(req.body);

      const userId: string = getUserId(req.headers.authorization);
      userFeedback.userid = userId;

      const sport: string = req.params.sport;
      const updatedSportFeedback = await Sport.findOneAndUpdate(
        { sport: sport },
        { $push: { reviews: userFeedback } },
        { new: true }
      );
      res.status(200).json(updatedSportFeedback);
    } catch (err) {
      res.status(400).json({ message: "Bad request!" });
    }
  },
  getFeedbackAsAdmin: async (req: Request, res: Response) => {
    try {
      const filter: object = { sport: req.query.sport };
      const selector: any = {
        reviews: 1,
        sport: 1,
      };
      const response = await Sport.find(filter, selector).lean();
      const reviews: Array<any> = response[0]!.reviews;
      let sum: number = 0;
      for (let feedback in reviews) {
        sum += reviews[feedback].grade;
      }
      const avgGrade: number = sum / reviews.length;
      res.status(200).json({
        response,
        avgGrade,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateSportClassAsAdmin: async (req: Request, res: Response) => {
    try {
      const newSlassSchedule = new ClassTime(req.body);
      const { sport, ageGroup, classSchedule } = req.query;

      const filter: object = { sport: sport };
      const update: object = {
        $set: { [ageGroup + "." + classSchedule]: newSlassSchedule },
      };

      const response = await Sport.findOneAndUpdate(filter, update, {
        new: true,
      }).lean();
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
